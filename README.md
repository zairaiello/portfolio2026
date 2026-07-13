# Zaira Aiello — Digital Portfolio

Base del sito, pronta per Visual Studio Code e per essere pubblicata sul tuo dominio.
Tutti i testi del sito sono in **inglese** (come nel PDF cartaceo) — lascialo così,
non serve tradurre.

## Struttura

```
zaira-portfolio/
├─ index.html          → home (cover, quote, teaser About/Work, footer)
├─ about.html           → pagina About — pagina vera, non una sezione
├─ work.html             → indice progetti (lista in stile jackygrob, con
│                           anteprima colorata che segue il mouse)
├─ projects/
│   ├─ icon.html          → ICON. (arancio)
│   ├─ ito.html            → ITO (blu)
│   ├─ steven-meisel.html  → Steven Meisel (rosa)
│   ├─ 07-10.html          → 07/10 (rosso)
│   ├─ bodoni.html         → Bodoni (verde)
│   ├─ new-project.html    → template vuoto per il prossimo progetto (giallo)
│   └─ icon-site/          → qui dentro va il codice del sito web di ICON
├─ css/style.css         → font, colori, tutti gli stili
├─ js/main.js             → cursore, scramble, transizioni, chaos toggle
├─ fonts/                 → i tuoi file Arial Narrow + Helvetica Neue
└─ assets/
    ├─ icon/photos  icon/posters
    ├─ ito/photos   ito/gadgets
    ├─ steven-meisel/photos
    ├─ 07-10/photos
    ├─ bodoni/photos
    └─ about/
```

Ogni progetto è una **pagina vera** in `projects/`, collegata dal menu e
dall'indice in `work.html` — non più cartelle-finte come nella versione
precedente.

## Font

Uso i file che mi hai mandato, dichiarati in cima a `css/style.css`:

- **Titoli** → `Arial Narrow Bold` (file `ARIALNB.woff`). È lo stesso font
  usato nel PDF originale (l'ho verificato: il PDF usa "ArialNarrow-Bold").
  Un vero cut "Arial Narrow **Black**" non esiste come font a sé — il peso
  più pesante di Arial Narrow è proprio il Bold. Per i titoli enormi di
  copertina/hero uso in più la classe `.hero-letter`/`.display-black`, che
  prende `Arial Black` (`ARIBLK.woff`) e lo comprime leggermente via CSS
  per avvicinarlo all'effetto condensed+black del cartaceo.
- **Testo** → `Helvetica Neue Medium` (file `HelveticaNeueMedium.woff`) è
  il peso di default per tutti i paragrafi, come richiesto.

Se un giorno vuoi cambiare pesi, i file disponibili sono tutti in `fonts/`
e già dichiarati con `@font-face` in cima al CSS.

## Cosa manca per ogni progetto (in base a quello che mi hai detto)

### ICON. — `projects/icon.html`
- **Foto** → carica in `assets/icon/photos/`, sostituisci i placeholder nella sezione "Gallery"
- **Mock-up poster** → `assets/icon/posters/`, sezione "Poster mock-ups"
- **PDF booklet (32mo)** → salvalo come `assets/icon/icon-booklet.pdf`, poi nella sezione "Documents" togli il commento `<!-- -->` dall'iframe
- **PDF tesi** → `assets/icon/icon-thesis.pdf`, stessa sezione, secondo iframe
- **2 video (progetto + teaser)** → sezione "Videos": se sono su YouTube/Vimeo incolla l'iframe embed al posto del commento; se sono file tuoi usa `<video controls src="...">`
- **Sito web** (il codice che mi mandi) → mettilo dentro `projects/icon-site/`
  mantenendo un `index.html` nella root di quella cartella. Poi nella
  sezione "Website" della pagina togli il commento dall'iframe: lo vedrai
  live sia embeddato che tramite il bottone "Open the full site ↗".

### ITO — `projects/ito.html`
- **Foto** → `assets/ito/photos/`
- **Mock-up gadget** → `assets/ito/gadgets/`
- **PDF brand manual** → `assets/ito/ito-brand-manual.pdf`, sezione "Brand manual"
- **Video** → sezione "Video", stesso procedimento di ICON.
- **Sito Figma** → nella sezione "Website" sostituisci l'URL nel bottone
  `Open Figma prototype ↗` con il link reale del tuo prototipo (in Figma:
  Share → seleziona "Prototype" → Copy link)

### Steven Meisel, 07/10, Bodoni
Stessa logica, più semplice: solo **Gallery** (foto in
`assets/<progetto>/photos/`) e **Full book** (il PDF completo del libro,
percorso indicato nel commento dentro ogni pagina).

## Come aggiungere contenuti (in generale)

Apri la pagina del progetto e cerca i commenti con le emoji 🖼️ 📄 🎬 🔗:
indicano esattamente dove intervenire.

**Foto**
```html
<img src="../assets/icon/photos/01.jpg" alt="Descrizione dell'immagine">
```

**PDF**
```html
<iframe class="embed-pdf" src="../assets/icon/icon-booklet.pdf"></iframe>
```

**Video da YouTube/Vimeo**
```html
<iframe src="https://www.youtube.com/embed/IDVIDEO" allowfullscreen></iframe>
```
Video tuo: `<video controls src="../assets/icon/video.mp4"></video>`

**Link esterno (es. Figma)**
```html
<a class="link-external" href="https://..." target="_blank" rel="noopener">Open ↗</a>
```

## Aggiungere un settimo progetto

1. Duplica `projects/new-project.html`, rinominalo.
2. Crea la cartella `assets/mio-progetto/`.
3. Cambia titolo, colore (`background:#...` nell'header e `--cursor-color`), testi e meta.
4. Aggiungi una riga in `work.html` dentro `.work-list` che punta al nuovo file.

## Colori (identici al cartaceo)

| Colore | Hex | Uso |
|---|---|---|
| Dark grey | `#1a1919` | cover / footer |
| Yellow | `#edda1c` | accenti |
| Orange | `#f05123` | ICON. |
| Blue | `#222cf0` | ITO |
| Pink | `#ff94cd` | Steven Meisel |
| Red | `#db2121` | 07/10 |
| Green | `#27a33c` | Bodoni |

## Le parti "un po' pazze" (ispirate a jackygrob.com e ma5a.com)

- **Cursore elastico**: un pallino + un anello satellite che seguono il
  mouse con un piccolo ritardo "a molla".
- **Scramble text**: i titoli principali si ricompongono lettera per lettera.
- **Work index stile jackygrob**: lista numerata pulita, e passando il
  mouse su una riga appare una piccola anteprima colorata che segue il
  cursore (invece di card statiche).
- **Chaos toggle**: bottoncino tondo in basso a destra — cliccalo per
  attivare un leggero "wobble" sui titoli, easter egg innocuo in stile
  ma5a.
- **Transizione a tinta** tra le pagine, e **particelle** colorate nel footer.

Tutto rispetta `prefers-reduced-motion` e si disattiva da solo per chi ha
impostato "riduci le animazioni".

## Pubblicare sul tuo dominio

Sito statico puro, nessuna build: carica l'intera cartella
`zaira-portfolio` sull'hosting collegato al dominio, mantenendo
`index.html` nella root.

## Anteprima locale in VS Code

Estensione **Live Server** → apri `index.html` → tasto destro →
"Open with Live Server".
