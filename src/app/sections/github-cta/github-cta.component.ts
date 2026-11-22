import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GITHUB_URL } from '../../data/portfolio.config';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-github-cta',
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="github" class="section github-section shell">
      <div class="section-heading" appReveal><div class="section-eyebrow"><span>03</span> / GITHUB</div></div>
      <div class="github-feature" appReveal>
        <div class="github-glow" aria-hidden="true"></div>
        <div class="github-feature-icon" aria-hidden="true"><app-icon name="github" /></div>
        <div class="github-feature-copy">
          <span class="github-mini-label">OPEN SOURCE · GITHUB</span>
          <h2>Il resto è su <span>GitHub.</span></h2>
          <p>Repository, codice sorgente e nuovi esperimenti: tutto nel mio spazio di sviluppo.</p>
          <a class="button button-primary" [href]="githubUrl" target="_blank" rel="noopener noreferrer">
            {{ githubLabel }} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div class="github-decoration" aria-hidden="true">
          <span>&lt;code /&gt;</span><span>git push origin main</span><span>● &nbsp;public repositories</span>
        </div>
      </div>
    </section>
  `,
})
export class GithubCtaComponent {
  protected readonly githubUrl = GITHUB_URL;
  protected readonly githubLabel = GITHUB_URL.replace(/^https:\/\//, '');
}
