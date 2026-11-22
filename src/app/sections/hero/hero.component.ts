import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GITHUB_URL } from '../../data/portfolio.config';
import { ScrollService } from '../../services/scroll.service';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-hero',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  protected readonly scroll = inject(ScrollService);
  protected readonly githubUrl = GITHUB_URL;
}
