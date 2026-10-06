import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressIndicatorComponent } from '../../../shared/ui/progress-indicator/progress-indicator.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressIndicatorComponent, RouterLink],
  selector: 'app-resume-step-header',
  styleUrl: './resume-step-header.component.scss',
  templateUrl: './resume-step-header.component.html',
})
export class ResumeStepHeaderComponent {
  readonly currentStep = input.required<number>();
  readonly backLink = input<string | undefined>(undefined);
}
