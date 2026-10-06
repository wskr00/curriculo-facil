import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { ExperienceEntry, ResumeDraftModel } from '../resume-draft.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-resume-preview',
  styleUrl: './resume-preview.component.scss',
  templateUrl: './resume-preview.component.html',
})
export class ResumePreviewComponent {
  readonly resume = input.required<ResumeDraftModel>();

  protected readonly experiences = computed(() =>
    this.resume().experience.entries.filter(
      ({ role, company, description }) => role || company || description,
    ),
  );
  protected readonly education = computed(() =>
    this.resume().education.filter(
      ({ level, institution, status }) => level || institution || status,
    ),
  );
  protected readonly courses = computed(() => this.resume().courses.filter(({ name }) => name));
  protected readonly skills = computed(() => [
    ...this.resume().skills,
    ...(this.resume().otherSkill ? [this.resume().otherSkill] : []),
  ]);

  protected experiencePeriod(experience: ExperienceEntry): string {
    const start = [experience.startMonth, experience.startYear].filter(Boolean).join('/');
    const end = experience.current
      ? 'atual'
      : [experience.endMonth, experience.endYear].filter(Boolean).join('/');

    return [start, end].filter(Boolean).join(' – ');
  }
}
