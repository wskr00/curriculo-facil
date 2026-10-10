import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { formatBrazilianPhoneNumber } from '../../../shared/utils/phone-number';
import type { ExperienceEntry, ResumeDraftModel } from '../resume-draft.service';

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

  protected experiencePeriod(experience: ExperienceEntry): string {
    const start = ResumePreviewComponent.monthAndYear(
      experience.startMonth,
      experience.startYear,
    );
    const end = experience.current
      ? 'atual'
      : ResumePreviewComponent.monthAndYear(experience.endMonth, experience.endYear);

    return [start, end].filter(Boolean).join(' – ');
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
}
