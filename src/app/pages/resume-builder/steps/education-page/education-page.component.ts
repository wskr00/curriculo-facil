import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormField, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { RepeatableEntryComponent } from '../../../../shared/ui/repeatable-entry/repeatable-entry.component';
import { RepeatableSectionComponent } from '../../../../shared/ui/repeatable-section/repeatable-section.component';
import { TextFieldComponent } from '../../../../shared/ui/text-field/text-field.component';
import { ResumeDraftService } from '../../resume-draft.service';
import { ResumeStepHeaderComponent } from '../../resume-step-header/resume-step-header.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    FormField,
    RepeatableEntryComponent,
    RepeatableSectionComponent,
    ResumeStepHeaderComponent,
    TextFieldComponent,
  ],
  selector: 'app-education-page',
  styleUrl: './education-page.component.scss',
  templateUrl: './education-page.component.html',
})
export class EducationPageComponent {
  protected readonly draft = inject(ResumeDraftService);
  private readonly router = inject(Router);

  protected onContinue(event: SubmitEvent): void {
    event.preventDefault();

    void submit(this.draft.form.education, async () => {
      await this.router.navigateByUrl('/curriculo/novo/cursos-e-habilidades');
    });
  }
}
