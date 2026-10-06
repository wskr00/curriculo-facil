import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  model,
  viewChildren,
} from '@angular/core';
import { FormValueControlBase } from '../../forms/form-value-control-base';

export interface ChoiceOption {
  readonly value: string;
  readonly label: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-choice-group',
  styleUrl: './choice-group.component.scss',
  templateUrl: './choice-group.component.html',
})
export class ChoiceGroupComponent extends FormValueControlBase<string> {
  readonly options = input.required<readonly ChoiceOption[]>();

  readonly value = model('');

  private readonly radioControls = viewChildren<ElementRef<HTMLInputElement>>(
    'radioControl',
  );

  focus(options?: FocusOptions): void {
    if (this.disabled()) {
      return;
    }

    const radioControls = this.radioControls().map(({ nativeElement }) => nativeElement);
    const selectedControl = radioControls.find((control) => control.checked);

    (selectedControl ?? radioControls[0])?.focus(options);
  }
}
