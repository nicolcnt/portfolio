# Nico — Developer Portfolio

Portfolio single-page in italiano, realizzato con **Angular 21, TypeScript e SCSS**, senza librerie UI esterne.

Sito: <https://nicolcnt.github.io/portfolio/>

## Avvio

```bash
npm ci
npm start          # http://localhost:4200/
npm run build      # build di produzione
npm test           # test (Vitest) in watch mode
npm run test:ci    # test una sola volta, come in CI
```

## Struttura

```
src/
├── index.html                      meta tag e font
├── styles.scss                     entry point degli stili
├── styles/
│   ├── _base.scss                  variabili colore, reset
│   └── _sections.scss              stili delle sezioni + responsive
└── app/
    ├── app.ts / app.html           shell della pagina
    ├── data/portfolio.config.ts    ← tutti i contenuti modificabili
    ├── services/
    │   ├── github.service.ts       chiamata API GitHub, filtri, modello Project
    │   └── scroll.service.ts       scroll alle sezioni
    ├── shared/
    │   ├── icon.component.ts       icone SVG (github, mail, discord, …)
    │   └── reveal.directive.ts     animazione di comparsa allo scroll
    └── sections/                   header, hero, projects (+ modale), stack,
                                    github-cta, contacts, footer
```

## Contenuti

Tutto si modifica in `src/app/data/portfolio.config.ts`:

- `GITHUB_USERNAME`: usato per API, link e testi.
- `EXCLUDED_REPOSITORIES`: repository da non mostrare (oltre a fork e archiviati, sempre esclusi).
- `PROJECT_DETAILS`: schede editoriali facoltative (titolo, descrizione, punti salienti, tag, grafica della card). La chiave è il nome del repository in minuscolo.
- `SKILL_GROUPS`: tecnologie divise per categoria.
- `CONTACTS`: link di contatto; aggiungi o togli voci (c'è una voce LinkedIn pronta da decommentare).
- `NAV_ITEMS`: voci del menu.

## Progetti da GitHub

I repository pubblici vengono caricati a ogni visita dall'API REST di GitHub (nessun token nel browser), ordinati per ultimo aggiornamento. L'API non autenticata ha un limite di circa 60 richieste/ora per IP: se fallisce, la pagina mostra un avviso, un progetto di esempio dichiarato come tale e un pulsante "Riprova".

## Deploy

Il workflow `.github/workflows/deploy.yml` a ogni push su `main` esegue i test, compila con `--base-href /portfolio/`, crea `404.html` e pubblica su GitHub Pages.

## Accessibilità

Tema scuro, layout responsive, rispetto di `prefers-reduced-motion`, navigazione da tastiera, modale con focus trap, chiusura con Esc e ripristino del focus.
