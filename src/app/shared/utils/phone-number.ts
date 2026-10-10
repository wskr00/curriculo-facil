const MAX_BRAZILIAN_PHONE_DIGITS = 11;

export function digitsOnly(value: string): string {
  return value.replace(/[^0-9]/g, '');
}

export function formatBrazilianPhoneNumber(value: string): string {
  const digits = digitsOnly(value).slice(0, MAX_BRAZILIAN_PHONE_DIGITS);

  if (digits.length <= 2) {
    return digits ? `(${digits}` : '';
  }

  const areaCode = digits.slice(0, 2);
  const subscriberNumber = digits.slice(2);
  const prefixLength = subscriberNumber.startsWith('9') || digits.length > 10 ? 5 : 4;
  const prefix = subscriberNumber.slice(0, prefixLength);
  const suffix = subscriberNumber.slice(prefixLength);

  return `(${areaCode}) ${prefix}${suffix ? `-${suffix}` : ''}`;
}

export function countDigitsBefore(value: string, position: number): number {
  return digitsOnly(value.slice(0, position)).length;
}

export function phoneCaretPosition(formattedValue: string, digitsBeforeCaret: number): number {
  if (digitsBeforeCaret <= 0) {
    return 0;
  }

  let digitCount = 0;

  for (let position = 0; position < formattedValue.length; position += 1) {
    const character = formattedValue[position];

    if (character < '0' || character > '9') {
      continue;
    }

    digitCount += 1;

    if (digitCount === digitsBeforeCaret) {
      let caretPosition = position + 1;

      while (
        caretPosition < formattedValue.length &&
        (formattedValue[caretPosition] < '0' || formattedValue[caretPosition] > '9')
      ) {
        caretPosition += 1;
      }

      return caretPosition;
    }
  }

  return formattedValue.length;
}
