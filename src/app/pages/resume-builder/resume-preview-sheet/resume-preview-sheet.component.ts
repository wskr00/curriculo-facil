import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import type { ResumeDraftModel } from '../resume-draft.service';
import { ResumePreviewComponent } from '../resume-preview/resume-preview.component';

interface SheetDrag {
  pointerId: number;
  startY: number;
  startOffset: number;
  travel: number;
  moved: boolean;
}

const DRAG_THRESHOLD = 6;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, ResumePreviewComponent],
  selector: 'app-resume-preview-sheet',
  styleUrl: './resume-preview-sheet.component.scss',
  templateUrl: './resume-preview-sheet.component.html',
})
export class ResumePreviewSheetComponent {
  readonly resume = input.required<ResumeDraftModel>();

  protected readonly expanded = signal(false);

  private readonly destroyRef = inject(DestroyRef);
  private readonly handle = viewChild.required<ElementRef<HTMLButtonElement>>('handle');
  private readonly sheet = viewChild.required<ElementRef<HTMLElement>>('sheet');
  private drag: SheetDrag | null = null;
  private suppressPointerClick = false;

  constructor() {
    afterNextRender(() => {
      const handle = this.handle().nativeElement;
      const onPointerDown = (event: PointerEvent) => this.startDrag(event);
      const onPointerMove = (event: PointerEvent) => this.moveDrag(event);
      const onPointerUp = (event: PointerEvent) => this.finishDrag(event);
      const onPointerCancel = (event: PointerEvent) => this.cancelDrag(event);

      handle.addEventListener('pointerdown', onPointerDown);
      handle.addEventListener('pointermove', onPointerMove, { passive: true });
      handle.addEventListener('pointerup', onPointerUp);
      handle.addEventListener('pointercancel', onPointerCancel);

      this.destroyRef.onDestroy(() => {
        handle.removeEventListener('pointerdown', onPointerDown);
        handle.removeEventListener('pointermove', onPointerMove);
        handle.removeEventListener('pointerup', onPointerUp);
        handle.removeEventListener('pointercancel', onPointerCancel);
      });
    });
  }

  protected toggleFromHandle(event: MouseEvent): void {
    if (this.suppressPointerClick) {
      this.suppressPointerClick = false;
      event.preventDefault();
      return;
    }

    this.setExpanded(!this.expanded());
  }

  protected closePreview(): void {
    this.setExpanded(false);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.expanded()) {
      event.preventDefault();
      this.setExpanded(false);
    }
  }

  private startDrag(event: PointerEvent): void {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) {
      return;
    }

    const sheet = this.sheet().nativeElement;
    const styles = getComputedStyle(sheet);
    const peekValue = styles.getPropertyValue('--preview-sheet-peek-height').trim();
    const rootFontSize = Number.parseFloat(
      getComputedStyle(sheet.ownerDocument.documentElement).fontSize,
    );
    const peekHeight =
      Number.parseFloat(peekValue) * (peekValue.endsWith('rem') ? rootFontSize : 1);
    const travel = Math.max(0, sheet.clientHeight - peekHeight);
    const transform = styles.transform;
    const startOffset = transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).m42;

    this.drag = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startOffset,
      travel,
      moved: false,
    };
    this.suppressPointerClick = false;
    sheet.style.setProperty('transition-property', 'none');
    sheet.style.setProperty('--preview-sheet-drag-offset', startOffset + 'px');
    this.handle().nativeElement.setPointerCapture(event.pointerId);
  }

  private moveDrag(event: PointerEvent): void {
    const drag = this.drag;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const distance = event.clientY - drag.startY;

    if (Math.abs(distance) >= DRAG_THRESHOLD) {
      drag.moved = true;
    }

    if (drag.moved) {
      const offset = Math.min(drag.travel, Math.max(0, drag.startOffset + distance));
      this.sheet().nativeElement.style.setProperty('--preview-sheet-drag-offset', offset + 'px');
    }
  }

  private finishDrag(event: PointerEvent): void {
    const drag = this.drag;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    this.drag = null;

    if (!drag.moved) {
      this.resetDragStyles();
      return;
    }

    const offset = Math.min(
      drag.travel,
      Math.max(0, drag.startOffset + event.clientY - drag.startY),
    );
    const shouldExpand = offset < drag.travel / 2;
    const sheet = this.sheet().nativeElement;

    sheet.style.setProperty('--preview-sheet-drag-offset', offset + 'px');
    this.suppressPointerClick = true;
    this.setExpanded(shouldExpand);

    requestAnimationFrame(() => {
      this.suppressPointerClick = false;
      this.resetDragStyles();
    });
  }

  private cancelDrag(event: PointerEvent): void {
    if (this.drag?.pointerId !== event.pointerId) {
      return;
    }

    this.drag = null;
    this.resetDragStyles();
  }

  private resetDragStyles(): void {
    const sheet = this.sheet().nativeElement;

    sheet.style.removeProperty('--preview-sheet-drag-offset');
    sheet.style.removeProperty('transition-property');
  }

  private setExpanded(expanded: boolean): void {
    this.expanded.set(expanded);
    this.sheet().nativeElement.classList.toggle('is-expanded', expanded);
    this.handle().nativeElement.focus({ preventScroll: true });
  }
}
