import { describe, expect, it } from 'vitest';
import {
  countDigitsBefore,
  digitsOnly,
  formatBrazilianPhoneNumber,
  phoneCaretPosition,
} from './phone-number';

describe('phone number utilities', () => {
  it('keeps only digits from user-entered text', () => {
    expect(digitsOnly('(00) 0000a0-0000')).toBe('00000000000');
  });

  it('formats mobile and landline numbers and caps input at eleven digits', () => {
    expect(formatBrazilianPhoneNumber('00000000000')).toBe('(00) 00000-0000');
    expect(formatBrazilianPhoneNumber('0000000000')).toBe('(00) 0000-0000');
    expect(formatBrazilianPhoneNumber('00000000000111')).toBe('(00) 00000-0000');
  });

  it('keeps the caret aligned with the same digit after formatting separators', () => {
    const unformatted = '00000000000';
    const cursorPosition = 5;
    const digitsBeforeCursor = countDigitsBefore(unformatted, cursorPosition);
    const formatted = formatBrazilianPhoneNumber(unformatted);

    expect(digitsBeforeCursor).toBe(5);
    const caretPosition = phoneCaretPosition(formatted, digitsBeforeCursor);

    expect(countDigitsBefore(formatted, caretPosition)).toBe(digitsBeforeCursor);
  });
});
