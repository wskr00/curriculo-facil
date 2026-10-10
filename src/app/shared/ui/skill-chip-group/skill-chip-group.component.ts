import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  model,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { FormValueControlBase } from '../../forms/form-value-control-base';
import { ButtonComponent } from '../button/button.component';
import { TextFieldComponent } from '../text-field/text-field.component';

export interface SkillChipOption {
  readonly value: string;
  readonly label: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, TextFieldComponent],
  selector: 'app-skill-chip-group',
  styleUrl: './skill-chip-group.component.scss',
  templateUrl: './skill-chip-group.component.html',
})
export class SkillChipGroupComponent extends FormValueControlBase<string[]> {
  readonly options = input.required<readonly SkillChipOption[]>();

  readonly value = model<string[]>([]);

  protected readonly pendingSkill = signal('');
  protected readonly canAdd = computed(() => !!this.pendingSkill().trim());
  protected readonly customSkillId = computed(() => `${this.controlId()}-custom-skill`);
  protected readonly customSkills = computed(() => {
    const optionValues = new Set(this.options().map(({ value }) => value));

    return this.value().filter((value) => !optionValues.has(value));
  });
  protected readonly statusMessage = signal('');

  private readonly customSkillField = viewChild(TextFieldComponent);
  private readonly checkboxControls = viewChildren<ElementRef<HTMLInputElement>>(
    'checkboxControl',
  );

  isSelected(value: string): boolean {
    return this.value().includes(value);
  }

  toggleOption(value: string, selected: boolean): void {
    this.statusMessage.set('');
    this.value.update((current) => {
      if (selected) {
        return current.includes(value) ? current : [...current, value];
      }

      return current.filter((currentValue) => currentValue !== value);
    });
  }

  protected addCustomSkill(): void {
    const skill = this.pendingSkill().trim();

    if (!skill || this.disabled()) {
      return;
    }

    const normalizedSkill = SkillChipGroupComponent.normalize(skill);
    const matchingOption = this.options().find(
      ({ value }) => SkillChipGroupComponent.normalize(value) === normalizedSkill,
    );

    if (matchingOption) {
      const wasSelected = this.value().includes(matchingOption.value);

      this.value.update((current) =>
        wasSelected ? current : [...current, matchingOption.value],
      );
      this.pendingSkill.set('');
      this.statusMessage.set(
        wasSelected
          ? `“${matchingOption.label}” já está selecionada.`
          : `“${matchingOption.label}” estava nas opções e foi selecionada.`,
      );
      this.focusCustomSkillField();
      return;
    }

    const alreadyAdded = this.value().some(
      (currentSkill) => SkillChipGroupComponent.normalize(currentSkill) === normalizedSkill,
    );

    if (alreadyAdded) {
      this.statusMessage.set(`“${skill}” já está na lista.`);
      this.focusCustomSkillField();
      return;
    }

    this.value.update((current) => [...current, skill]);
    this.pendingSkill.set('');
    this.statusMessage.set(`“${skill}” foi adicionada.`);
    this.focusCustomSkillField();
  }

  protected removeCustomSkill(skill: string): void {
    if (this.disabled()) {
      return;
    }

    this.value.update((current) => current.filter((currentSkill) => currentSkill !== skill));
    this.statusMessage.set(`“${skill}” foi removida.`);
    this.focusCustomSkillField();
  }

  protected onPendingSkillChange(value: string): void {
    this.pendingSkill.set(value);
    this.statusMessage.set('');
  }

  protected onCustomSkillKeydown(event: Event): void {
    if (!(event instanceof KeyboardEvent) || event.isComposing) {
      return;
    }

    event.preventDefault();
    this.addCustomSkill();
  }

  focus(options?: FocusOptions): void {
    if (this.disabled()) {
      return;
    }

    const controls = this.checkboxControls();
    const selectedControl = controls.find(({ nativeElement }) => nativeElement.checked);

    (selectedControl ?? controls[0])?.nativeElement.focus(options);
  }

  private focusCustomSkillField(): void {
    if (!this.disabled()) {
      this.customSkillField()?.focus();
    }
  }

  private static normalize(value: string): string {
    return value.trim().toLocaleLowerCase('pt-BR');
  }
}
