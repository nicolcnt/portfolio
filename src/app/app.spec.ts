import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { GITHUB_URL } from './data/portfolio.config';
import { filterPortfolioProjects, GithubRepository, safeHttpsUrl, toProject } from './services/github.service';

const makeRepo = (name: string, extra: Partial<GithubRepository> = {}): GithubRepository => ({
  id: name.length,
  name,
  html_url: `${GITHUB_URL}/${name}`,
  description: null,
  homepage: null,
  language: 'TypeScript',
  topics: [],
  updated_at: '2026-11-01T00:00:00Z',
  archived: false,
  fork: false,
  ...extra,
});

describe('Nico portfolio', () => {
  beforeEach(async () => {
    // Evita chiamate reali all'API GitHub durante i test.
    globalThis.fetch = (() => new Promise<Response>(() => undefined)) as typeof fetch;
    await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
  });

  it('renders the developer-focused introduction', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Full Stack Developer');
    expect(text).toContain('Progetti');
  });

  it('excludes test, profile, portfolio, fork and archived repositories', () => {
    const result = filterPortfolioProjects([
      makeRepo('pokexplorer'),
      makeRepo('pokexplorer-test'),
      makeRepo('nicolcnt'),
      makeRepo('portfolio'),
      makeRepo('forked-lib', { fork: true }),
      makeRepo('old-stuff', { archived: true }),
      makeRepo('new-app', { updated_at: '2026-11-10T00:00:00Z' }),
    ]);
    expect(result.map((repo) => repo.name)).toEqual(['new-app', 'pokexplorer']);
  });

  it('uses editorial details when available and API data otherwise', () => {
    expect(toProject(makeRepo('pokexplorer')).title).toBe('Pokéxplorer');
    const generic = toProject(makeRepo('my_cool-app', { topics: ['angular'] }));
    expect(generic.title).toBe('my cool app');
    expect(generic.tags).toEqual(['TypeScript', 'angular']);
    expect(generic.visual).toBe('code');
  });

  it('accepts only https demo URLs', () => {
    expect(safeHttpsUrl('https://example.com')).toBe('https://example.com/');
    expect(safeHttpsUrl('http://example.com')).toBeNull();
    expect(safeHttpsUrl('javascript:alert(1)')).toBeNull();
    expect(safeHttpsUrl(null)).toBeNull();
  });
});
