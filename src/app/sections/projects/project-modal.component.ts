import { DatePipe, DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Project } from '../../services/github.service';

@Component({
  selector: 'app-project-modal',
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'closed.emit()' },
  templateUrl: './project-modal.component.html',
})
export class ProjectModalComponent implements AfterViewInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly previouslyFocused = this.document.activeElement as HTMLElement | null;
  private readonly dialog = viewChild.required<ElementRef<HTMLElement>>('dialog');
  private readonly closeButton = viewChild.required<ElementRef<HTMLButtonElement>>('closeButton');

  readonly project = input.required<Project>();
  readonly closed = output<void>();

  ngAfterViewInit(): void {
    this.document.body.classList.add('dialog-open');
    this.closeButton().nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('dialog-open');
    this.previouslyFocused?.focus();
  }

  /** Focus trap minimale: Tab e Shift+Tab restano dentro la finestra. */
  protected trapFocus(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;
    const focusable = this.dialog().nativeElement.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && this.document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && this.document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
