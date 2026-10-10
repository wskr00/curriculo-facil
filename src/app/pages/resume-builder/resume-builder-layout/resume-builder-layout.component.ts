import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ResumeDraftService } from '../resume-draft.service';
import { ResumePreviewComponent } from '../resume-preview/resume-preview.component';
import { ResumePreviewSheetComponent } from '../resume-preview-sheet/resume-preview-sheet.component';
import { ResumeStepHeaderComponent } from '../resume-step-header/resume-step-header.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ResumePreviewComponent,
    ResumePreviewSheetComponent,
    ResumeStepHeaderComponent,
    RouterOutlet,
  ],
  providers: [ResumeDraftService],
  selector: 'app-resume-builder-layout',
  styleUrl: './resume-builder-layout.component.scss',
  templateUrl: './resume-builder-layout.component.html',
})
export class ResumeBuilderLayoutComponent {
  protected readonly draft = inject(ResumeDraftService);
  protected readonly currentStep = signal(1);
  protected readonly backLink = signal<string | undefined>(undefined);

  private readonly route = inject(ActivatedRoute);

  protected updateStepNavigation(): void {
    const { step, backLink } = this.route.firstChild?.snapshot.data ?? {};

    this.currentStep.set(typeof step === 'number' ? step : 1);
    this.backLink.set(typeof backLink === 'string' ? backLink : undefined);
  }
}
