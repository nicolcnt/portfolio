import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACTS } from '../../data/portfolio.config';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contacts',
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="section contact-section shell">
      <div class="section-heading" appReveal>
        <div class="section-eyebrow"><span>04</span> / CONTATTI</div>
        <h2>Hai un'idea? <span class="section-highlight">Parliamone.</span></h2>
        <p>Puoi trovarmi qui. Pochi link, quelli giusti.</p>
      </div>
      <div class="contact-grid" appReveal>
        @for (contact of contacts; track contact.label) {
          @let external = !contact.href.startsWith('mailto:');
          <a
            class="contact-card"
            [href]="contact.href"
            [attr.target]="external ? '_blank' : null"
            [attr.rel]="external ? 'noopener noreferrer' : null"
          >
            <span class="contact-icon" aria-hidden="true">
              <app-icon [name]="contact.icon" />
            </span>
            <span class="contact-info"><strong>{{ contact.label }}</strong><small>{{ contact.handle }}</small></span>
            <span class="contact-arrow" aria-hidden="true">↗</span>
          </a>
        }
      </div>
    </section>
  `,
})
export class ContactsComponent {
  protected readonly contacts = CONTACTS;
}
