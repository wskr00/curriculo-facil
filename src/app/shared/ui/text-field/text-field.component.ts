import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  computed,
  input,
  model,
  viewChild,
} from '@angular/core';
import { FormValueControlBase } from '../../forms/form-value-control-base';
import {
  countDigitsBefore,
  digitsOnly,
  formatBrazilianPhoneNumber,
  phoneCaretPosition,
} from '../../utils/phone-number';

export type TextFieldType = 'email' | 'search' | 'tel' | 'text' | 'url';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-text-field',
  styleUrl: './text-field.component.scss',
  templateUrl: './text-field.component.html',
})
export class TextFieldComponent extends FormValueControlBase<string> {
  readonly placeholder = input('');
  readonly type = input<TextFieldType>('text');
  readonly autocomplete = input<string | undefined>(undefined);

  readonly value = model('');
  readonly readonly = input(false);
  readonly numericOnly = input(false, { transform: booleanAttribute });
  readonly showOptional = input(true, { transform: booleanAttribute });
  readonly minLength = input<number | undefined>(undefined);
  readonly maxLength = input<number | undefined>(undefined);

  protected readonly displayValue = computed(() =>
    this.type() === 'tel' ? formatBrazilianPhoneNumber(this.value()) : this.value(),
  );

  private readonly control = viewChild<ElementRef<HTMLInputElement>>('control');

  focus(options?: FocusOptions): void {
    this.control()?.nativeElement.focus(options);
  }

  protected onInput(event: Event, control: HTMLInputElement): void {
    const inputValue = control.value;

    if (this.type() === 'tel') {
      this.onPhoneInput(event, control);
      return;
    }

    if (!this.numericOnly()) {
      this.value.set(inputValue);
      return;
    }

    const cursorPosition = control.selectionStart ?? inputValue.length;
    const digits = digitsOnly(inputValue);

    if (digits !== inputValue) {
      const digitsBeforeCursor = countDigitsBefore(inputValue, cursorPosition);

      control.value = digits;
      control.setSelectionRange(digitsBeforeCursor, digitsBeforeCursor);
    }

    this.value.set(digits);
  }

  private onPhoneInput(event: Event, control: HTMLInputElement): void {
    const inputValue = control.value;
    const cursorPosition = control.selectionStart ?? inputValue.length;
    const previousDigits = digitsOnly(this.value()).slice(0, 11);
    const digitsBeforeCursor = countDigitsBefore(inputValue, cursorPosition);
    let digits = digitsOnly(inputValue).slice(0, 11);
    let nextCursorDigit = Math.min(digitsBeforeCursor, digits.length);
    const inputType = (event as InputEvent).inputType;
    const collapsedSelection = control.selectionStart === control.selectionEnd;

    if (digits === previousDigits && collapsedSelection) {
      if (inputType === 'deleteContentBackward' && nextCursorDigit > 0) {
        digits = `${digits.slice(0, nextCursorDigit - 1)}${digits.slice(nextCursorDigit)}`;
        nextCursorDigit -= 1;
      } else if (inputType === 'deleteContentForward' && nextCursorDigit < digits.length) {
        digits = `${digits.slice(0, nextCursorDigit)}${digits.slice(nextCursorDigit + 1)}`;
      }
    }

    const formattedValue = formatBrazilianPhoneNumber(digits);

    if (control.value !== formattedValue) {
      control.value = formattedValue;
    }

    const caretPosition = phoneCaretPosition(formattedValue, nextCursorDigit);
    control.setSelectionRange(caretPosition, caretPosition);
    this.value.set(digits);
  }
}
