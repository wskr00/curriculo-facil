import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ResumeDraftModel } from '../resume-draft.service';
import { ResumePreviewComponent } from './resume-preview.component';

vi.mock('dompdf.js', () => ({ computePageBreaks: () => [] }));

describe('ResumePreviewComponent', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('shows work experience in reverse chronological order, including overlapping periods', () => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe(): void {}
        disconnect(): void {}
      },
    );

    const fixture = TestBed.createComponent(ResumePreviewComponent);
    fixture.componentRef.setInput('resume', createResumeWithOutOfOrderExperience());
    fixture.detectChanges();

    const entries = Array.from<HTMLElement>(
      fixture.nativeElement.querySelectorAll('.resume-preview__entry-heading h3'),
    ).map((heading) => heading.textContent?.trim());

    expect(entries).toEqual([
      'Trabalho atual',
      'Trabalho mais recente',
      'Trabalho sobreposto',
      'Primeiro trabalho',
    ]);
  });
});

function createResumeWithOutOfOrderExperience(): ResumeDraftModel {
  return {
    personalData: { fullName: 'Pessoa Exemplo', phone: '', email: '', location: '' },
    objective: { role: '', summary: '' },
    experience: {
      noExperience: false,
      entries: [
        {
          role: 'Auxiliar',
          company: 'Primeiro trabalho',
          startMonth: '1',
          startYear: '2010',
          endMonth: '12',
          endYear: '2014',
          current: false,
          description: 'Atendimento',
        },
        {
          role: 'Atendente',
          company: 'Trabalho mais recente',
          startMonth: '1',
          startYear: '2020',
          endMonth: '12',
          endYear: '2022',
          current: false,
          description: 'Atendimento',
        },
        {
          role: 'Caixa',
          company: 'Trabalho sobreposto',
          startMonth: '1',
          startYear: '2021',
          endMonth: '6',
          endYear: '2022',
          current: false,
          description: 'Operação de caixa',
        },
        {
          role: 'Vendedora',
          company: 'Trabalho atual',
          startMonth: '1',
          startYear: '2023',
          endMonth: '',
          endYear: '',
          current: true,
          description: 'Vendas',
        },
      ],
    },
    education: [],
    courses: [],
    skills: [],
  };
}
