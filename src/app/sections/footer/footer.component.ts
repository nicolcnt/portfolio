import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="shell footer-inner">
        <div class="footer-brand">nico<span>.</span>dev</div>
        <span>© {{ year }}</span>
        <button type="button" (click)="scroll.scrollTo('home')">Torna su ↑</button>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly scroll = inject(ScrollService);
  protected readonly year = new Date().getFullYear();
}
