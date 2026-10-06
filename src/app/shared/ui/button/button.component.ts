import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    '[class.button-host--primary]': "variant() === 'primary'",
  },
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly type = input<ButtonType>('button');
  readonly disabled = input(false, { transform: booleanAttribute });

  private readonly control = viewChild<ElementRef<HTMLButtonElement>>('control');

  focus(options?: FocusOptions): void {
    this.control()?.nativeElement.focus(options);
  }
}
