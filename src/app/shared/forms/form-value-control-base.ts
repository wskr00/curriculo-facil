import {
  computed,
  Directive,
  input,
  output,
  type ModelSignal,
} from '@angular/core';
import type {
  FormValueControl,
  ValidationError,
  WithOptionalFieldTree,
} from '@angular/forms/signals';

@Directive()
export abstract class FormValueControlBase<TValue>
  implements FormValueControl<TValue>
{
  abstract readonly value: ModelSignal<TValue>;

  readonly controlId = input.required<string>();
  readonly label = input.required<string>();
  readonly hint = input('');

  readonly name = input('');
  readonly disabled = input(false);
  readonly hidden = input(false);
  readonly invalid = input(false);
  readonly touched = input(false);
  readonly required = input(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  readonly touch = output<void>();

  protected readonly errorMessage = computed(() => {
    if (!this.invalid() || !this.touched()) {
      return undefined;
    }

    return this.errors().find((error) => error.message)?.message;
  });
  protected readonly hintId = computed(() => `${this.controlId()}-hint`);
  protected readonly errorId = computed(() => `${this.controlId()}-error`);
  protected readonly describedBy = computed(() => {
    const ids = [
      this.hint() ? this.hintId() : undefined,
      this.errorMessage() ? this.errorId() : undefined,
    ].filter((id): id is string => !!id);

    return ids.length ? ids.join(' ') : undefined;
  });

  protected markTouched(event: FocusEvent, fieldset: HTMLFieldSetElement): void {
    const nextTarget = event.relatedTarget;

    if (nextTarget instanceof Node && fieldset.contains(nextTarget)) {
      return;
    }

    this.touch.emit();
  }

  abstract focus(options?: FocusOptions): void;
}
