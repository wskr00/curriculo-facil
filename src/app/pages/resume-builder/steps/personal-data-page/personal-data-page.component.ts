import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormField, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { TextFieldComponent } from '../../../../shared/ui/text-field/text-field.component';
import { ResumeDraftService } from '../../resume-draft.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, FormField, TextFieldComponent],
  selector: 'app-personal-data-page',
  styleUrl: './personal-data-page.component.scss',
  templateUrl: './personal-data-page.component.html',
})
export class PersonalDataPageComponent {
  protected readonly draft = inject(ResumeDraftService);
  private readonly router = inject(Router);

  protected onContinue(event: SubmitEvent): void {
    event.preventDefault();

    void submit(this.draft.form.personalData, async () => {
      await this.router.navigateByUrl('/curriculo/objetivo');
    });
  }
}
