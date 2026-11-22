import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GITHUB_URL, NAV_ITEMS } from '../../data/portfolio.config';
import { ScrollService } from '../../services/scroll.service';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-site-header',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'menuOpen.set(false)' },
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private readonly scroll = inject(ScrollService);
  protected readonly navItems = NAV_ITEMS;
  protected readonly githubUrl = GITHUB_URL;
  protected readonly menuOpen = signal(false);

  protected go(id: string): void {
    this.menuOpen.set(false);
    this.scroll.scrollTo(id);
  }
}
