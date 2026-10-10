import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormField, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { MonthYearFieldComponent } from '../../../../shared/ui/month-year-field/month-year-field.component';
import { RepeatableEntryComponent } from '../../../../shared/ui/repeatable-entry/repeatable-entry.component';
import { RepeatableSectionComponent } from '../../../../shared/ui/repeatable-section/repeatable-section.component';
import { TextFieldComponent } from '../../../../shared/ui/text-field/text-field.component';
import { TextareaComponent } from '../../../../shared/ui/textarea/textarea.component';
import { ResumeDraftService } from '../../resume-draft.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    FormField,
    MonthYearFieldComponent,
    RepeatableEntryComponent,
    RepeatableSectionComponent,
    TextareaComponent,
    TextFieldComponent,
  ],
  selector: 'app-experience-page',
  styleUrl: './experience-page.component.scss',
  templateUrl: './experience-page.component.html',
})
export class ExperiencePageComponent {
  protected readonly draft = inject(ResumeDraftService);
  private readonly router = inject(Router);

  protected onContinue(event: SubmitEvent): void {
    event.preventDefault();

    void submit(this.draft.form.experience, async () => {
      await this.router.navigateByUrl('/curriculo/novo/formacao');
    });
  }
}
