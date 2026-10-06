import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
  selector: 'app-repeatable-entry',
  styleUrl: './repeatable-entry.component.scss',
  templateUrl: './repeatable-entry.component.html',
})
export class RepeatableEntryComponent {
  readonly label = input.required<string>();
  readonly removeLabel = input.required<string>();
  readonly remove = output<void>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  focus(options?: FocusOptions): void {
    this.host.nativeElement
      .querySelector<HTMLElement>(
        'input:not(:disabled), textarea:not(:disabled), select:not(:disabled), button:not(:disabled), [tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])',
      )
      ?.focus(options);
  }
}
