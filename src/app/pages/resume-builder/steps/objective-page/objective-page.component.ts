import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormField, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { TextFieldComponent } from '../../../../shared/ui/text-field/text-field.component';
import { TextareaComponent } from '../../../../shared/ui/textarea/textarea.component';
import { ResumeDraftService } from '../../resume-draft.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, FormField, TextareaComponent, TextFieldComponent],
  selector: 'app-objective-page',
  styleUrl: './objective-page.component.scss',
  templateUrl: './objective-page.component.html',
})
export class ObjectivePageComponent {
  protected readonly draft = inject(ResumeDraftService);
  private readonly router = inject(Router);

  protected onContinue(event: SubmitEvent): void {
    event.preventDefault();

    void submit(this.draft.form.objective, async () => {
      await this.router.navigateByUrl('/curriculo/novo/experiencias');
    });
  }
}
