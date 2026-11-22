import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/** Aggiunge la classe `visible` quando l'elemento entra nel viewport (animazione `.reveal`). */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.element.classList.add('visible');
      return;
    }
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          this.element.classList.add('visible');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -35px 0px' },
    );
    this.observer.observe(this.element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
