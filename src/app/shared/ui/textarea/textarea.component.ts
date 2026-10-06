import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  model,
  viewChild,
} from '@angular/core';
import { FormValueControlBase } from '../../forms/form-value-control-base';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-textarea',
  styleUrl: './textarea.component.scss',
  templateUrl: './textarea.component.html',
})
export class TextareaComponent extends FormValueControlBase<string> {
  readonly placeholder = input('');

  readonly value = model('');
  readonly readonly = input(false);
  readonly minLength = input<number | undefined>(undefined);
  readonly maxLength = input<number | undefined>(undefined);

  private readonly control = viewChild<ElementRef<HTMLTextAreaElement>>('control');

  focus(options?: FocusOptions): void {
    this.control()?.nativeElement.focus(options);
  }
}
