import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  viewChild,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
  selector: 'app-repeatable-section',
  styleUrl: './repeatable-section.component.scss',
  templateUrl: './repeatable-section.component.html',
})
export class RepeatableSectionComponent {
  readonly sectionId = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input('');
  readonly addLabel = input.required<string>();
  readonly add = output<void>();

  private readonly addButton = viewChild(ButtonComponent);

  protected readonly titleId = computed(() => `${this.sectionId()}-title`);
  protected readonly descriptionId = computed(() => `${this.sectionId()}-description`);

  focusAddButton(options?: FocusOptions): void {
    this.addButton()?.focus(options);
  }
}
