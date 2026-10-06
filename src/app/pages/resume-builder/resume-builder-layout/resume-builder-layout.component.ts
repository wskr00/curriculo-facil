import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ResumeDraftService } from '../resume-draft.service';
import { ResumePreviewComponent } from '../resume-preview/resume-preview.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, ResumePreviewComponent, RouterOutlet],
  providers: [ResumeDraftService],
  selector: 'app-resume-builder-layout',
  styleUrl: './resume-builder-layout.component.scss',
  templateUrl: './resume-builder-layout.component.html',
})
export class ResumeBuilderLayoutComponent {
  protected readonly draft = inject(ResumeDraftService);
}
