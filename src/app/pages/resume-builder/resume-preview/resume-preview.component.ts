import {
  afterNextRender,
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { formatBrazilianPhoneNumber } from '../../../shared/utils/phone-number';
import type { ExperienceEntry, ResumeDraftModel } from '../resume-draft.service';
import {
  RESUME_CONTENT_HEIGHT_PX,
  RESUME_CONTENT_WIDTH_PX,
  RESUME_PAGE_HEIGHT_PX,
  RESUME_PAGE_GUTTER_PX,
  RESUME_PAGE_MARGIN_PX,
  RESUME_PAGE_WIDTH_PX,
  RESUME_PDF_OPTIONS,
  RESUME_PREVIEW_PAGE_FLOW_GAP_PX,
} from '../resume-pdf-layout';

const MONTH_ABBREVIATIONS = [
  'jan.',
  'fev.',
  'mar.',
  'abr.',
  'mai.',
  'jun.',
  'jul.',
  'ago.',
  'set.',
  'out.',
  'nov.',
  'dez.',
] as const;

interface OrderedExperience {
  experience: ExperienceEntry;
  position: number;
  startDate: number | null;
  endDate: number | null;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-resume-preview',
  styleUrl: './resume-preview.component.scss',
  templateUrl: './resume-preview.component.html',
})
export class ResumePreviewComponent {
  readonly resume = input.required<ResumeDraftModel>();

  protected readonly pageCount = signal(1);
  protected readonly previewScale = signal(1);
  protected readonly pageWidthPx = RESUME_PAGE_WIDTH_PX;
  protected readonly pageHeightPx = RESUME_PAGE_HEIGHT_PX;
  protected readonly pageMarginPx = RESUME_PAGE_MARGIN_PX;
  protected readonly pageGutterPx = RESUME_PAGE_GUTTER_PX;
  protected readonly contentWidthPx = RESUME_CONTENT_WIDTH_PX;
  protected readonly contentHeightPx = RESUME_CONTENT_HEIGHT_PX;
  protected readonly pageSheets = computed(() =>
    Array.from({ length: this.pageCount() }, (_, index) => ({
      number: index + 1,
      top: index * (this.pageHeightPx + this.pageGutterPx),
    })),
  );
  protected readonly canvasHeight = computed(() =>
    Math.max(
      this.pageCount() * this.pageHeightPx + (this.pageCount() - 1) * this.pageGutterPx,
      this.documentHeight() + this.pageMarginPx * 2,
    ),
  );
  protected readonly previewHeight = computed(() => this.canvasHeight() * this.previewScale());
  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');
  private readonly canvas = viewChild.required<ElementRef<HTMLElement>>('canvas');
  private readonly pdfDocument = viewChild.required<ElementRef<HTMLElement>>('pdfDocument');
  private readonly destroyRef = inject(DestroyRef);
  private readonly pageGapBeforeBlocks = signal<ReadonlyMap<string, number>>(new Map());
  protected readonly documentHeight = signal(RESUME_CONTENT_HEIGHT_PX);
  private paginationRequest = 0;

  protected readonly contactDetails = computed(() => {
    const { location, phone, email } = this.resume().personalData;

    return [location, formatBrazilianPhoneNumber(phone), email].filter(Boolean);
  });
  protected readonly experiences = computed(() =>
    this.resume()
      .experience.entries.map((experience, position): OrderedExperience => ({
        experience,
        position,
        startDate: ResumePreviewComponent.monthIndex(experience.startMonth, experience.startYear),
        endDate: experience.current
          ? Number.POSITIVE_INFINITY
          : ResumePreviewComponent.monthIndex(experience.endMonth, experience.endYear),
      }))
      .filter(({ experience: { role, company, description } }) => role || company || description)
      .sort(ResumePreviewComponent.compareExperiences)
      .map(({ experience }) => experience),
  );
  protected readonly education = computed(() =>
    this.resume().education.filter(
      ({ level, institution, status }) => level || institution || status,
    ),
  );
  protected readonly courses = computed(() => this.resume().courses.filter(({ name }) => name));
  protected readonly skills = computed(() => this.resume().skills.filter(Boolean));

  constructor() {
    afterNextRender(() => {
      const viewport = this.viewport().nativeElement;
      const document = this.pdfDocument().nativeElement;
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === viewport) {
            this.previewScale.set(Math.min(1, entry.contentRect.width / RESUME_PAGE_WIDTH_PX));
          } else if (entry.target === document) {
            this.documentHeight.set(document.offsetHeight);

            if (entry.contentRect.width > 0) {
              void this.updatePageBreaks();
            }
          }
        }
      });

      observer.observe(viewport);
      observer.observe(document);
      this.destroyRef.onDestroy(() => {
        this.paginationRequest += 1;
        observer.disconnect();
      });
    });

    afterRenderEffect(() => {
      this.resume();
      void this.updatePageBreaks();
    });
  }

  getPdfContentElement(): HTMLElement {
    return this.pdfDocument().nativeElement;
  }

  protected hasPageGapBefore(blockId: string): boolean {
    return this.pageGapBeforeBlocks().has(blockId);
  }

  protected pageGapBefore(blockId: string): number | null {
    return this.pageGapBeforeBlocks().get(blockId) ?? null;
  }

  prepareForPdfExport(): () => void {
    const canvas = this.canvas().nativeElement;
    const previousScale = canvas.style.getPropertyValue('--resume-preview-scale');
    const wasExporting = canvas.classList.contains('resume-preview__canvas--pdf-export');
    let restored = false;

    canvas.style.setProperty('--resume-preview-scale', '1');
    canvas.classList.add('resume-preview__canvas--pdf-export');

    return () => {
      if (restored) {
        return;
      }

      if (previousScale) {
        canvas.style.setProperty('--resume-preview-scale', previousScale);
      } else {
        canvas.style.removeProperty('--resume-preview-scale');
      }

      if (!wasExporting) {
        canvas.classList.remove('resume-preview__canvas--pdf-export');
      }

      restored = true;
    };
  }

  protected experiencePeriod(experience: ExperienceEntry): string {
    const start = ResumePreviewComponent.monthAndYear(experience.startMonth, experience.startYear);
    const end = experience.current
      ? 'atual'
      : ResumePreviewComponent.monthAndYear(experience.endMonth, experience.endYear);

    return [start, end].filter(Boolean).join(' – ');
  }

  private async updatePageBreaks(): Promise<void> {
    const request = ++this.paginationRequest;
    const document = this.pdfDocument().nativeElement;

    try {
      const { computePageBreaks } = await import('dompdf.js');

      if (request !== this.paginationRequest || !document.isConnected) {
        return;
      }

      const restoreScale = this.prepareForPdfExport();

      try {
        const pageBreaks = computePageBreaks(document, RESUME_PDF_OPTIONS);

        this.pageCount.set(pageBreaks.length + 1);
        this.pageGapBeforeBlocks.set(ResumePreviewComponent.pageGapTargets(document, pageBreaks));
      } finally {
        restoreScale();
      }
    } catch {
      if (request !== this.paginationRequest || !document.isConnected) {
        return;
      }

      this.pageCount.set(1);
      this.pageGapBeforeBlocks.set(new Map());
    }
  }

  private static monthIndex(month: string, year: string): number | null {
    const monthNumber = Number(month);
    const yearNumber = Number(year);

    if (
      !Number.isInteger(monthNumber) ||
      monthNumber < 1 ||
      monthNumber > 12 ||
      !Number.isSafeInteger(yearNumber) ||
      yearNumber < 1
    ) {
      return null;
    }

    const dateIndex = yearNumber * 12 + monthNumber - 1;

    return Number.isSafeInteger(dateIndex) ? dateIndex : null;
  }

  private static compareExperiences(left: OrderedExperience, right: OrderedExperience): number {
    if (left.endDate === null || right.endDate === null) {
      if (left.endDate !== right.endDate) {
        return left.endDate === null ? 1 : -1;
      }
    } else if (left.endDate !== right.endDate) {
      return right.endDate - left.endDate;
    }

    if (left.startDate === null || right.startDate === null) {
      if (left.startDate !== right.startDate) {
        return left.startDate === null ? 1 : -1;
      }

      return left.position - right.position;
    }

    if (left.startDate !== right.startDate) {
      return right.startDate - left.startDate;
    }

    return left.position - right.position;
  }

  private static monthAndYear(month: string, year: string): string {
    const monthNumber = Number(month);
    const monthLabel = MONTH_ABBREVIATIONS[monthNumber - 1] ?? '';

    return [monthLabel, year].filter(Boolean).join(' ');
  }

  private static pageGapTargets(
    document: HTMLElement,
    pageBreaks: readonly number[],
  ): ReadonlyMap<string, number> {
    const documentTop = document.getBoundingClientRect().top;
    const pageBlocks = Array.from(
      document.querySelectorAll<HTMLElement>('[data-resume-page-block][divisionDisable]'),
    )
      .map((element) => {
        const rect = element.getBoundingClientRect();

        return {
          bottom: rect.bottom - documentTop,
          id: element.dataset['resumePageBlock'] ?? '',
          top: rect.top - documentTop,
        };
      })
      .filter(({ id }) => id)
      .sort((left, right) => left.top - right.top);
    const targets = new Map<string, number>();
    let insertedGap = 0;

    for (const [index, pageBreak] of pageBreaks.entries()) {
      const crossedBlocks = pageBlocks.filter(
        ({ bottom, top }) => top < pageBreak - 0.5 && bottom > pageBreak + 0.5,
      );
      const afterTop = crossedBlocks.length
        ? Math.max(...crossedBlocks.map(({ bottom }) => bottom))
        : pageBreak - 0.5;
      const nextBlock = pageBlocks.find(({ top }) => top >= afterTop);

      if (nextBlock) {
        const desiredTop =
          (index + 1) * (RESUME_CONTENT_HEIGHT_PX + RESUME_PREVIEW_PAGE_FLOW_GAP_PX);
        const gap = Math.max(0, desiredTop - nextBlock.top - insertedGap);

        if (gap > 0) {
          targets.set(nextBlock.id, (targets.get(nextBlock.id) ?? 0) + gap);
          insertedGap += gap;
        }
      }
    }

    return targets;
  }
}
