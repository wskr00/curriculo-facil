import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ResumeDraftService } from '../../resume-draft.service';
import { ReviewPageComponent } from './review-page.component';

vi.mock('dompdf.js', () => ({
  default: { downloadPDF: vi.fn() },
  computePageBreaks: () => [],
}));

describe('ReviewPageComponent', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('downloads the preview with a sanitized name based on the person’s name', async () => {
    const { fixture, draft } = await createReviewPage();
    const { default: dompdf } = await import('dompdf.js');
    const downloadPdf = vi.mocked(dompdf.downloadPDF);
    downloadPdf.mockResolvedValue(undefined);
    draft.form.personalData.fullName().value.set('Pessoa Exemplo / Teste.');
    fixture.detectChanges();

    fixture.nativeElement.querySelector('app-button button').click();
    await vi.waitFor(() => expect(downloadPdf).toHaveBeenCalledOnce());
    await vi.waitFor(() =>
      expect(fixture.nativeElement.querySelector('app-button button').disabled).toBe(false),
    );

    const [content, options, fileName] = downloadPdf.mock.calls[0];

    expect(content.textContent).toContain('Pessoa Exemplo / Teste.');
    expect(options).toEqual(expect.objectContaining({ format: 'a4' }));
    expect(fileName).toBe('Curriculo Pessoa Exemplo Teste.pdf');
  });

  it('reports a readable error and re-enables the download action when PDF generation fails', async () => {
    const { fixture } = await createReviewPage();
    const { default: dompdf } = await import('dompdf.js');
    const downloadPdf = vi.mocked(dompdf.downloadPDF);
    downloadPdf.mockRejectedValue(new Error('PDF renderer failed'));

    fixture.nativeElement.querySelector('app-button button').click();
    await vi.waitFor(() =>
      expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain(
        'Não foi possível gerar o PDF. Tente novamente.',
      ),
    );

    expect(fixture.nativeElement.querySelector('app-button button').disabled).toBe(false);
  });
});

async function createReviewPage() {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe(): void {}
      disconnect(): void {}
    },
  );

  TestBed.configureTestingModule({ providers: [provideRouter([]), ResumeDraftService] });
  const draft = TestBed.inject(ResumeDraftService);
  const fixture = TestBed.createComponent(ReviewPageComponent);
  fixture.detectChanges();
  await fixture.whenStable();

  return { draft, fixture };
}
