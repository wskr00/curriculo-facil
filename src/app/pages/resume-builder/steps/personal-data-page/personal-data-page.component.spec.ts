import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ObjectivePageComponent } from '../objective-page/objective-page.component';
import { PersonalDataPageComponent } from './personal-data-page.component';
import { ResumeDraftService } from '../../resume-draft.service';

describe('PersonalDataPageComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'curriculo/dados-pessoais', component: PersonalDataPageComponent },
          { path: 'curriculo/objetivo', component: ObjectivePageComponent },
        ]),
        ResumeDraftService,
      ],
    });
  });

  it('keeps the user on the step when required personal information is missing', async () => {
    const harness = await RouterTestingHarness.create('/curriculo/dados-pessoais');
    const form = harness.routeNativeElement!.querySelector('form')!;

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await harness.fixture.whenStable();
    harness.fixture.detectChanges();

    expect(TestBed.inject(Router).url).toBe('/curriculo/dados-pessoais');
    expect(harness.routeNativeElement?.textContent).toContain('Informe seu nome completo.');
  });

  it('stores entered values and advances when required information is valid', async () => {
    const harness = await RouterTestingHarness.create('/curriculo/dados-pessoais');
    const draft = TestBed.inject(ResumeDraftService);
    const routeElement = harness.routeNativeElement!;

    enterText(routeElement, 'full-name', 'Pessoa Exemplo');
    enterText(routeElement, 'phone', '00000000000');
    enterText(routeElement, 'location', 'Cidade Exemplo, SP');

    routeElement.querySelector('form')!.dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true }),
    );
    await harness.fixture.whenStable();
    harness.fixture.detectChanges();

    expect(draft.draft().personalData).toEqual({
      fullName: 'Pessoa Exemplo',
      phone: '00000000000',
      email: '',
      location: 'Cidade Exemplo, SP',
    });
    expect(TestBed.inject(Router).url).toBe('/curriculo/objetivo');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Que trabalho você procura?',
    );
  });
});

function enterText(root: ParentNode, id: string, value: string): void {
  const input = root.querySelector<HTMLInputElement>(`#${id}`);

  if (!input) {
    throw new Error(`Campo #${id} não encontrado no formulário.`);
  }

  input.value = value;
  input.setSelectionRange(value.length, value.length);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}
