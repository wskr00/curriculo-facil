import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { TextFieldComponent } from './text-field.component';

describe('TextFieldComponent', () => {
  it('formats a phone as the user types while keeping digits in the model', async () => {
    const fixture = TestBed.createComponent(TextFieldComponent);
    fixture.componentRef.setInput('controlId', 'phone');
    fixture.componentRef.setInput('label', 'Telefone');
    fixture.componentRef.setInput('type', 'tel');
    await fixture.whenStable();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = '00000000000';
    input.setSelectionRange(input.value.length, input.value.length);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(input.value).toBe('(00) 00000-0000');
    expect(fixture.componentInstance.value()).toBe('00000000000');
    expect(input.getAttribute('inputmode')).toBe('numeric');
  });

  it('strips non-digit characters from numeric-only fields', async () => {
    const fixture = TestBed.createComponent(TextFieldComponent);
    fixture.componentRef.setInput('controlId', 'year');
    fixture.componentRef.setInput('label', 'Ano');
    fixture.componentRef.setInput('numericOnly', true);
    await fixture.whenStable();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = '20a26';
    input.setSelectionRange(input.value.length, input.value.length);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(input.value).toBe('2026');
    expect(fixture.componentInstance.value()).toBe('2026');
    expect(input.getAttribute('inputmode')).toBe('numeric');
  });
});
