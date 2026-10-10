import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { ResumeDraftService } from '../../resume-draft.service';
import { RESUME_PDF_OPTIONS } from '../../resume-pdf-layout';
import { ResumePreviewComponent } from '../../resume-preview/resume-preview.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, ResumePreviewComponent, RouterLink],
  selector: 'app-review-page',
  styleUrl: './review-page.component.scss',
  templateUrl: './review-page.component.html',
})
export class ReviewPageComponent {
  protected readonly draft = inject(ResumeDraftService);
  protected readonly isDownloading = signal(false);
  protected readonly downloadMessage = signal('');

  private readonly resumePreview = viewChild(ResumePreviewComponent);

  protected async downloadPdf(): Promise<void> {
    const preview = this.resumePreview();
    const content = preview?.getPdfContentElement();

    if (!preview || !content || this.isDownloading()) {
      return;
    }

    this.downloadMessage.set('');
    this.isDownloading.set(true);

    try {
      const { default: dompdf } = await import('dompdf.js');
      const restorePreviewScale = preview.prepareForPdfExport();
      let totalPages: number | undefined;

      try {
        await dompdf.downloadPDF(
          content,
          {
            ...RESUME_PDF_OPTIONS,
            onProgress: (progress) => {
              if (progress.totalPages) {
                totalPages = progress.totalPages;
              }

              if (progress.stage === 'countingPages') {
                this.downloadMessage.set('Calculando as páginas do currículo…');
              } else if (progress.stage === 'rendering') {
                restorePreviewScale();

                if (progress.currentPage && progress.totalPages) {
                  this.downloadMessage.set(
                    `Gerando PDF: página ${progress.currentPage} de ${progress.totalPages}.`,
                  );
                } else if (progress.totalPages) {
                  this.downloadMessage.set(
                    `Gerando PDF com ${progress.totalPages} ${progress.totalPages === 1 ? 'página' : 'páginas'}…`,
                  );
                }
              }
            },
          },
          ReviewPageComponent.pdfFileName(this.draft.draft().personalData.fullName),
        );

        this.downloadMessage.set('');
      } finally {
        restorePreviewScale();
      }
    } catch {
      this.downloadMessage.set('Não foi possível gerar o PDF. Tente novamente.');
    } finally {
      this.isDownloading.set(false);
    }
  }

  private static pdfFileName(fullName: string): string {
    const safeName = fullName
      .normalize('NFC')
      .replace(/[\\/:*?"<>|\u0000-\u001f]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/[. ]+$/g, '');

    return safeName ? `Curriculo ${safeName}.pdf` : 'Curriculo.pdf';
  }
}
