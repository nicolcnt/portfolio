/** Configurazione del portfolio: modifica questi valori per personalizzare il sito. */
export const GITHUB_USERNAME = 'nicolcnt';
export const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

/** Repository da non mostrare nella sezione Progetti (confronto case-insensitive). */
export const EXCLUDED_REPOSITORIES: ReadonlySet<string> = new Set([
  'pokexplorer-test',
  'portfolio',
  'nicolaloconte', // vecchio repository README del profilo
  GITHUB_USERNAME.toLowerCase(), // repository README del profilo
]);

export type IconName =
  | 'github' | 'mail' | 'discord' | 'instagram' | 'linkedin'
  | 'menu' | 'close';

export interface ContactLink {
  label: string;
  /** Testo mostrato sotto l'etichetta (es. handle o indirizzo). */
  handle: string;
  href: string;
  icon: IconName;
}

/** Contatti mostrati nella sezione finale. Rimuovi una voce per nasconderla. */
export const CONTACTS: ContactLink[] = [
  { label: 'Email', handle: 'nicola.lo.conte18@gmail.com', href: 'mailto:nicola.lo.conte18@gmail.com', icon: 'mail' },
  { label: 'GitHub', handle: `@${GITHUB_USERNAME}`, href: GITHUB_URL, icon: 'github' },
  { label: 'Discord', handle: '@17nico', href: 'https://discord.com/users/572861763905781790', icon: 'discord' },
  { label: 'Instagram', handle: 'nicola.lo.conte', href: 'https://www.instagram.com/nicola.lo.conte/', icon: 'instagram' },
  // { label: 'LinkedIn', handle: 'Nicola Lo Conte', href: 'https://www.linkedin.com/in/…/', icon: 'linkedin' },
];

export interface NavItem {
  id: string;
  label: string;
}

/** Voci di navigazione: l'id deve corrispondere all'id della sezione. */
export const NAV_ITEMS: NavItem[] = [
  { id: 'projects', label: 'Progetti' },
  { id: 'stack', label: 'Tech stack' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contatti' },
];

export interface Technology {
  name: string;
  mark: string;
  tone: 'violet' | 'blue' | 'mint' | 'orange' | 'neutral';
}

export interface SkillGroup {
  title: string;
  subtitle: string;
  icon: string;
  technologies: Technology[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Linguaggi', subtitle: 'Il codice con cui lavoro', icon: '⌘',
    technologies: [
      { name: 'C#', mark: 'C#', tone: 'violet' },
      { name: 'Java', mark: 'J', tone: 'orange' },
      { name: 'TypeScript', mark: 'TS', tone: 'blue' },
      { name: 'JavaScript', mark: 'JS', tone: 'orange' },
      { name: 'HTML', mark: 'H5', tone: 'orange' },
      { name: 'CSS / SCSS', mark: '{}', tone: 'blue' },
      { name: 'SQL', mark: 'DB', tone: 'mint' },
    ],
  },
  {
    title: 'Framework & runtime', subtitle: 'Strumenti per costruire', icon: '◈',
    technologies: [
      { name: '.NET', mark: '.N', tone: 'violet' },
      { name: 'Angular', mark: 'A', tone: 'orange' },
      { name: 'Spring Framework', mark: 'S', tone: 'mint' },
      { name: 'Angular Material', mark: 'M', tone: 'violet' },
    ],
  },
  {
    title: 'Dati & testing', subtitle: 'Persistenza e qualità', icon: '◇',
    technologies: [
      { name: 'MySQL', mark: 'SQL', tone: 'blue' },
      { name: 'XML', mark: '</>', tone: 'orange' },
      { name: 'xUnit', mark: 'xU', tone: 'mint' },
      { name: 'LINQ', mark: 'λ', tone: 'violet' },
      { name: 'OOP', mark: 'OOP', tone: 'neutral' },
    ],
  },
  {
    title: 'Tools & workflow', subtitle: 'Il mio ambiente di sviluppo', icon: '⌁',
    technologies: [
      { name: 'Visual Studio', mark: 'VS', tone: 'violet' },
      { name: 'VS Code', mark: 'VS', tone: 'blue' },
      { name: 'Git', mark: 'Git', tone: 'orange' },
      { name: 'GitHub', mark: 'GH', tone: 'neutral' },
      { name: 'Azure DevOps', mark: 'Az', tone: 'blue' },
      { name: 'Eclipse', mark: 'E', tone: 'violet' },
      { name: 'npm', mark: 'npm', tone: 'orange' },
    ],
  },
];

/** Grafica della copertina della card progetto. */
export type ProjectVisual = 'code' | 'arcade' | 'taskmanager';

export interface ProjectEditorial {
  name: string;
  kicker: string;
  summary: string;
  highlights: string[];
  tags: string[];
  visual: ProjectVisual;
  /** Testo in fondo alla copertina della card. */
  tagline: string;
}

/**
 * Schede editoriali facoltative. La chiave è il nome del repository GitHub in minuscolo;
 * i repository senza scheda usano i metadati dell'API GitHub.
 */
export const PROJECT_DETAILS: Record<string, ProjectEditorial> = {
  taskmanager: {
    name: 'Task Manager',
    kicker: 'CONSOLE APP / C# + .NET',
    summary: 'Applicazione console sviluppata in C# e .NET 10 per organizzare e gestire attività, con stati, priorità, filtri e persistenza dei dati in JSON.',
    highlights: [
      'Creazione, modifica, ricerca ed eliminazione delle attività',
      'Gestione degli stati e delle priorità',
      'Architettura a livelli e programmazione OOP',
      'Persistenza JSON e ricerche LINQ',
      'Test automatici con xUnit',
    ],
    tags: ['C#', '.NET 10', 'OOP', 'LINQ', 'JSON', 'xUnit'],
    visual: 'taskmanager',
    tagline: 'PLAN · TRACK · COMPLETE',
  },
  pokexplorer: {
    name: 'Pokéxplorer',
    kicker: 'WEB GAME / INTERACTIVE',
    summary: 'Un gioco web a tema Pokémon con esplorazione, interazioni sulla mappa e un’interfaccia ispirata ai videogiochi classici.',
    highlights: [
      'Esplorazione di ambienti e mappe di gioco',
      'Interazioni e dialoghi in-game',
      'Modalità utente locale e configurazione Discord OAuth per il web',
    ],
    tags: ['JavaScript', 'HTML', 'CSS'],
    visual: 'arcade',
    tagline: 'EXPLORE · PLAY · BUILD',
  },
};
