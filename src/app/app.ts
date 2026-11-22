import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactsComponent } from './sections/contacts/contacts.component';
import { FooterComponent } from './sections/footer/footer.component';
import { GithubCtaComponent } from './sections/github-cta/github-cta.component';
import { HeaderComponent } from './sections/header/header.component';
import { HeroComponent } from './sections/hero/hero.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { StackComponent } from './sections/stack/stack.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HeroComponent,
    ProjectsComponent,
    StackComponent,
    GithubCtaComponent,
    ContactsComponent,
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class AppComponent {}
