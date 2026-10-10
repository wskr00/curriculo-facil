import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { ResumeDraftService } from '../../resume-draft.service';
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

  private readonly pdfContent = viewChild<ElementRef<HTMLElement>>('pdfContent');

  protected async downloadPdf(): Promise<void> {
    const content = this.pdfContent()?.nativeElement;

    if (!content || this.isDownloading()) {
      return;
    }

    this.downloadMessage.set('');
    this.isDownloading.set(true);

    try {
      const { default: dompdf } = await import('dompdf.js');

      await dompdf.downloadPDF(
        content,
        {
          backgroundColor: '#ffffff',
          format: 'a4',
          marginPt: [36, 36, 36, 36],
          pagination: true,
        },
        'curriculo.pdf',
      );

      this.downloadMessage.set('O PDF foi baixado neste dispositivo.');
    } catch {
      this.downloadMessage.set('Não foi possível gerar o PDF. Tente novamente.');
    } finally {
      this.isDownloading.set(false);
    }
  }
}
