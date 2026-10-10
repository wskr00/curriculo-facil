import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { RepeatableEntryComponent } from '../../../../shared/ui/repeatable-entry/repeatable-entry.component';
import { RepeatableSectionComponent } from '../../../../shared/ui/repeatable-section/repeatable-section.component';
import { SkillChipGroupComponent } from '../../../../shared/ui/skill-chip-group/skill-chip-group.component';
import { TextFieldComponent } from '../../../../shared/ui/text-field/text-field.component';
import { ResumeDraftService } from '../../resume-draft.service';

const SKILL_OPTIONS = [
  { value: 'Comunicação', label: 'Comunicação' },
  { value: 'Organização', label: 'Organização' },
  { value: 'Atendimento', label: 'Atendimento' },
  { value: 'Trabalho em equipe', label: 'Trabalho em equipe' },
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    FormField,
    RepeatableEntryComponent,
    RepeatableSectionComponent,
    SkillChipGroupComponent,
    TextFieldComponent,
  ],
  selector: 'app-courses-and-skills-page',
  styleUrl: './courses-and-skills-page.component.scss',
  templateUrl: './courses-and-skills-page.component.html',
})
export class CoursesAndSkillsPageComponent {
  protected readonly draft = inject(ResumeDraftService);
  protected readonly skillOptions = SKILL_OPTIONS;
  private readonly router = inject(Router);

  protected async onContinue(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    await this.router.navigateByUrl('/curriculo/revisao');
  }
}
