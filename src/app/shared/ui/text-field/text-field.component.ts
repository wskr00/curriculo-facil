import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  model,
  viewChild,
} from '@angular/core';
import { FormValueControlBase } from '../../forms/form-value-control-base';

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
  readonly minLength = input<number | undefined>(undefined);
  readonly maxLength = input<number | undefined>(undefined);

  private readonly control = viewChild<ElementRef<HTMLInputElement>>('control');

  focus(options?: FocusOptions): void {
    this.control()?.nativeElement.focus(options);
  }
}
