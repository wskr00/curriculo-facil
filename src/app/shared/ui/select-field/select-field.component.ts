import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  model,
  viewChild,
} from '@angular/core';
import { FormValueControlBase } from '../../forms/form-value-control-base';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-select-field',
  styleUrl: './select-field.component.scss',
  templateUrl: './select-field.component.html',
})
export class SelectFieldComponent extends FormValueControlBase<string> {
  readonly options = input.required<readonly SelectOption[]>();
  readonly placeholder = input('Selecione uma opção');

  readonly value = model('');

  private readonly control = viewChild<ElementRef<HTMLSelectElement>>('control');

  focus(options?: FocusOptions): void {
    this.control()?.nativeElement.focus(options);
  }
}
