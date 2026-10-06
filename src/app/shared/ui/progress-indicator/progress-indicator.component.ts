import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrl: './progress-indicator.component.scss',
})
export class ProgressIndicatorComponent {
  readonly currentStep = input.required<number>();
  readonly totalSteps = input.required<number>();
  readonly progressRatio = computed(() => this.currentStep() / this.totalSteps());
}
