import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  model,
  viewChildren,
} from '@angular/core';
import { FormValueControlBase } from '../../forms/form-value-control-base';

export interface SkillChipOption {
  readonly value: string;
  readonly label: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-skill-chip-group',
  styleUrl: './skill-chip-group.component.scss',
  templateUrl: './skill-chip-group.component.html',
})
export class SkillChipGroupComponent extends FormValueControlBase<string[]> {
  readonly options = input.required<readonly SkillChipOption[]>();

  readonly value = model<string[]>([]);

  private readonly checkboxControls = viewChildren<ElementRef<HTMLInputElement>>(
    'checkboxControl',
  );

  isSelected(value: string): boolean {
    return this.value().includes(value);
  }

  toggleOption(value: string, selected: boolean): void {
    this.value.update((current) => {
      if (selected) {
        return current.includes(value) ? current : [...current, value];
      }

      return current.filter((currentValue) => currentValue !== value);
    });
  }

  focus(options?: FocusOptions): void {
    if (this.disabled()) {
      return;
    }

    const controls = this.checkboxControls();
    const selectedControl = controls.find(({ nativeElement }) => nativeElement.checked);

    (selectedControl ?? controls[0])?.nativeElement.focus(options);
  }
}
