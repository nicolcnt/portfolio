import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { GITHUB_URL } from '../../data/portfolio.config';
import { loadGithubProjects, OFFLINE_FALLBACK, Project } from '../../services/github.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { ProjectModalComponent } from './project-modal.component';

@Component({
  selector: 'app-projects',
  imports: [RevealDirective, ProjectModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private requestController?: AbortController;

  protected readonly githubUrl = GITHUB_URL;
  protected readonly projects = signal<Project[]>([]);
  protected readonly loading = signal(true);
  protected readonly githubError = signal(false);
  protected readonly selected = signal<Project | null>(null);

  ngOnInit(): void {
    void this.refresh();
  }

  ngOnDestroy(): void {
    this.requestController?.abort();
  }

  protected async refresh(): Promise<void> {
    this.requestController?.abort();
    const controller = (this.requestController = new AbortController());
    this.loading.set(true);
    this.githubError.set(false);
    try {
      const data = await loadGithubProjects(controller.signal);
      if (!controller.signal.aborted) this.projects.set(data);
    } catch {
      if (!controller.signal.aborted) {
        this.githubError.set(true);
        this.projects.set(OFFLINE_FALLBACK);
      }
    } finally {
      if (!controller.signal.aborted) this.loading.set(false);
    }
  }

  protected projectNumber(index: number): string {
    return `PROJECT_${(index + 1).toString().padStart(2, '0')}`;
  }
}
