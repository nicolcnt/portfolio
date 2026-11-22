import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconName } from '../data/portfolio.config';

/** Icone SVG inline usate nel sito: un solo posto in cui definirle. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    @switch (name()) {
      @case ('github') {
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.06c-3.1.68-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.92.95 3.23.68.1-.72.39-1.21.71-1.49-2.47-.29-5.07-1.24-5.07-5.51 0-1.22.44-2.21 1.15-2.99-.12-.29-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14A10.6 10.6 0 0 1 12 6.48c.94 0 1.87.13 2.75.37 2.11-1.44 3.04-1.14 3.04-1.14.61 1.54.23 2.67.12 2.96.71.78 1.14 1.77 1.14 2.99 0 4.28-2.61 5.22-5.1 5.5.4.35.76 1.02.76 2.06v2.77c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9z"/></svg>
      }
      @case ('mail') {
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
      }
      @case ('discord') {
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6.5 9 5.7a12 12 0 0 1 6 0l1 .8 1.4-.4c1.4 2 2.2 4.2 2.5 6.8-1.3 1.6-2.8 2.8-4.4 3.4l-1-1.3M8 6.5l-1.4-.4C5.2 8.1 4.4 10.3 4.1 12.9c1.3 1.6 2.8 2.8 4.4 3.4l1-1.3c1.5.5 3.5.5 5 0"/><circle cx="9.1" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="14.9" cy="11" r="1" fill="currentColor" stroke="none"/></svg>
      }
      @case ('instagram') {
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></svg>
      }
      @case ('linkedin') {
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-7m0 3a3 3 0 0 1 6 0v4"/></svg>
      }
      @case ('menu') {
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      }
      @case ('close') {
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>
      }
    }
  `,
})
export class IconComponent {
  readonly name = input.required<IconName>();
}
