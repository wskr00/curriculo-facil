import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { FormField, type FieldTree } from '@angular/forms/signals';
import {
  SelectFieldComponent,
  type SelectOption,
} from '../select-field/select-field.component';

const MONTH_OPTIONS: readonly SelectOption[] = [
  { value: '01', label: 'Janeiro' },
  { value: '02', label: 'Fevereiro' },
  { value: '03', label: 'Março' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Maio' },
  { value: '06', label: 'Junho' },
  { value: '07', label: 'Julho' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' },
];

const CURRENT_YEAR = new Date().getFullYear();
const FIRST_YEAR = CURRENT_YEAR - 80;
const YEAR_OPTIONS: readonly SelectOption[] = Array.from(
  { length: CURRENT_YEAR - FIRST_YEAR + 1 },
  (_, index) => {
    const year = String(CURRENT_YEAR - index);
    return { value: year, label: year };
  },
);

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, SelectFieldComponent],
  selector: 'app-month-year-field',
  styleUrl: './month-year-field.component.scss',
  templateUrl: './month-year-field.component.html',
})
export class MonthYearFieldComponent {
  readonly controlId = input.required<string>();
  readonly label = input.required<string>();
  readonly monthField = input.required<FieldTree<string>>();
  readonly yearField = input.required<FieldTree<string>>();
  readonly hint = input('');

  protected readonly monthOptions = MONTH_OPTIONS;
  protected readonly yearOptions = YEAR_OPTIONS;
  protected readonly hintId = computed(() => `${this.controlId()}-hint`);
}
