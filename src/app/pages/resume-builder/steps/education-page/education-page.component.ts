import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormField, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { RepeatableEntryComponent } from '../../../../shared/ui/repeatable-entry/repeatable-entry.component';
import { RepeatableSectionComponent } from '../../../../shared/ui/repeatable-section/repeatable-section.component';
import {
  SelectFieldComponent,
  type SelectOption,
} from '../../../../shared/ui/select-field/select-field.component';
import { TextFieldComponent } from '../../../../shared/ui/text-field/text-field.component';
import { ResumeDraftService } from '../../resume-draft.service';

const EDUCATION_STATUS_OPTIONS: readonly SelectOption[] = [
  { value: 'Concluído', label: 'Concluído' },
  { value: 'Cursando', label: 'Cursando' },
  { value: 'Interrompido', label: 'Interrompido' },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    FormField,
    RepeatableEntryComponent,
    RepeatableSectionComponent,
    SelectFieldComponent,
    TextFieldComponent,
  ],
  selector: 'app-education-page',
  styleUrl: './education-page.component.scss',
  templateUrl: './education-page.component.html',
})
export class EducationPageComponent {
  protected readonly draft = inject(ResumeDraftService);
  protected readonly statusOptions = EDUCATION_STATUS_OPTIONS;
  private readonly router = inject(Router);

  protected onContinue(event: SubmitEvent): void {
    event.preventDefault();

    void submit(this.draft.form.education, async () => {
      await this.router.navigateByUrl('/curriculo/cursos-e-habilidades');
    });
  }
}
