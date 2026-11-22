import {
  EXCLUDED_REPOSITORIES,
  GITHUB_URL,
  GITHUB_USERNAME,
  PROJECT_DETAILS,
  ProjectVisual,
} from '../data/portfolio.config';

/** Sottoinsieme dei campi restituiti da GET /users/{user}/repos. */
export interface GithubRepository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  updated_at: string;
  stargazers_count?: number;
  archived: boolean;
  fork: boolean;
}

/** Dati già pronti per il template: niente chiamate a metodi dentro l'HTML. */
export interface Project {
  id: number;
  repoName: string;
  title: string;
  kicker: string;
  description: string;
  highlights: string[];
  tags: string[];
  visual: ProjectVisual;
  tagline: string;
  repoUrl: string;
  demoUrl: string | null;
  updatedAt: Date | null;
  stars: number;
}

const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=owner`;

/**
 * Carica i repository pubblici tramite l'API REST di GitHub (senza token).
 * Una sola richiesta da 100 repository basta per un profilo personale.
 */
export async function loadGithubProjects(signal: AbortSignal): Promise<Project[]> {
  const response = await fetch(API_URL, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!response.ok) throw new Error(`GitHub API: ${response.status}`);
  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) throw new Error('Risposta GitHub inattesa');
  return filterPortfolioProjects(payload as GithubRepository[]).map(toProject);
}

/** Esclude fork, repository archiviati e quelli elencati in EXCLUDED_REPOSITORIES. */
export function filterPortfolioProjects(repositories: GithubRepository[]): GithubRepository[] {
  return repositories
    .filter((repo) => !repo.fork && !repo.archived && !EXCLUDED_REPOSITORIES.has(repo.name.toLowerCase()))
    .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
}

export function toProject(repo: GithubRepository): Project {
  const editorial = PROJECT_DETAILS[repo.name.toLowerCase()];
  const apiTags = [repo.language, ...(repo.topics ?? [])].filter((tag): tag is string => !!tag);
  const updated = Date.parse(repo.updated_at);
  return {
    id: repo.id,
    repoName: repo.name,
    title: editorial?.name ?? repo.name.replace(/[-_]/g, ' '),
    kicker: editorial?.kicker ?? 'OPEN SOURCE / REPOSITORY',
    description:
      editorial?.summary ??
      repo.description ??
      'Scopri il repository, il codice sorgente e i dettagli del progetto su GitHub.',
    highlights: editorial?.highlights ?? [],
    tags: editorial?.tags.length ? editorial.tags : [...new Set(apiTags)].slice(0, 4),
    visual: editorial?.visual ?? 'code',
    tagline: editorial?.tagline ?? 'SOURCE / OPEN',
    repoUrl: repo.html_url,
    demoUrl: safeHttpsUrl(repo.homepage),
    updatedAt: Number.isNaN(updated) ? null : new Date(updated),
    stars: repo.stargazers_count ?? 0,
  };
}

/** Accetta solo URL https validi (il campo homepage è testo libero). */
export function safeHttpsUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

/** Mostrato solo se GitHub non risponde; la UI lo segnala esplicitamente. */
export const OFFLINE_FALLBACK: Project[] = [
  toProject({
    id: -1,
    name: 'pokexplorer',
    html_url: `${GITHUB_URL}/pokexplorer`,
    description: 'Web Pokémon Game',
    homepage: null,
    language: 'JavaScript',
    updated_at: '',
    archived: false,
    fork: false,
  }),
];
