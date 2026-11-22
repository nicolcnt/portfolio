import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SKILL_GROUPS } from '../../data/portfolio.config';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-stack',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="stack" class="section stack-section shell">
      <div class="section-heading" appReveal>
        <div class="section-eyebrow"><span>02</span> / TECH STACK</div>
        <h2>Gli strumenti <span class="section-highlight">del mestiere.</span></h2>
        <p>Linguaggi, framework e strumenti che utilizzo per progettare, sviluppare e testare software.</p>
      </div>
      <div class="skill-grid">
        @for (group of skillGroups; track group.title) {
          <article class="skill-card" appReveal>
            <header class="skill-card-header">
              <div class="skill-card-symbol" aria-hidden="true">{{ group.icon }}</div>
              <div><h3>{{ group.title }}</h3><p>{{ group.subtitle }}</p></div>
            </header>
            <div class="skill-items">
              @for (tech of group.technologies; track tech.name) {
                <div class="skill-item">
                  <span class="skill-mark" [class]="'tone-' + tech.tone" aria-hidden="true">{{ tech.mark }}</span>
                  <span>{{ tech.name }}</span>
                </div>
              }
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class StackComponent {
  protected readonly skillGroups = SKILL_GROUPS;
}
