import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { SkillChipGroupComponent } from './skill-chip-group.component';

describe('SkillChipGroupComponent', () => {
  async function createComponent() {
    const fixture = TestBed.createComponent(SkillChipGroupComponent);
    fixture.componentRef.setInput('controlId', 'skills');
    fixture.componentRef.setInput('label', 'Habilidades');
    fixture.componentRef.setInput('options', [
      { value: 'Atendimento', label: 'Atendimento' },
      { value: 'Organização', label: 'Organização' },
    ]);
    await fixture.whenStable();
    fixture.detectChanges();

    return fixture;
  }

  it('adds a custom skill, prevents case-insensitive duplicates, and exposes removal accessibly', async () => {
    const fixture = await createComponent();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#skills-custom-skill');
    const addButton = Array.from<HTMLButtonElement>(
      fixture.nativeElement.querySelectorAll('button'),
    ).find((button) => button.textContent?.trim() === 'Adicionar');

    expect(addButton).toBeDefined();

    input.value = '  Trabalho em equipe  ';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await fixture.whenStable();
    fixture.detectChanges();
    addButton?.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.componentInstance.value()).toEqual(['Trabalho em equipe']);
    expect(
      fixture.nativeElement.querySelector('[aria-label="Remover habilidade Trabalho em equipe"]'),
    ).not.toBeNull();

    input.value = 'trabalho em equipe';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await fixture.whenStable();
    fixture.detectChanges();
    addButton?.click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toEqual(['Trabalho em equipe']);
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain(
      'já está na lista',
    );

    fixture.nativeElement
      .querySelector('[aria-label="Remover habilidade Trabalho em equipe"]')
      .click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.componentInstance.value()).toEqual([]);
  });

  it('selects a matching suggested skill instead of creating a duplicate custom skill', async () => {
    const fixture = await createComponent();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#skills-custom-skill');
    const addButton = Array.from<HTMLButtonElement>(
      fixture.nativeElement.querySelectorAll('button'),
    ).find((button) => button.textContent?.trim() === 'Adicionar');

    input.value = ' atendimento ';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await fixture.whenStable();
    fixture.detectChanges();
    addButton?.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.componentInstance.value()).toEqual(['Atendimento']);
    expect(
      fixture.nativeElement.querySelector('[aria-label="Remover habilidade Atendimento"]'),
    ).toBeNull();
    expect(fixture.nativeElement.querySelector('input[type="checkbox"]').checked).toBe(true);
  });
});
