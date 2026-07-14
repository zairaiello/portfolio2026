# Zaira Aiello — Digital Portfolio

Base del sito, pronta per Visual Studio Code e per essere pubblicata sul tuo dominio.
Tutti i testi del sito sono in **inglese** (come nel PDF cartaceo) — lascialo così.

## Struttura

```
zaira-portfolio/
├─ index.html          → COVER (sfondo nero, la tua immagine di copertina).
│                          Non è la home: è la copertina. Cliccando si entra
│                          nel sito vero.
├─ about.html           → pagina About — sobria, non in evidenza
├─ work.html             → home del sito vero (sfondo bianco), indice progetti
├─ projects/
│   ├─ icon.html          → ICON. (arancio)
│   ├─ ito.html            → ITO (blu)
│   ├─ steven-meisel.html  → Steven Meisel (rosa)
│   ├─ 07-10.html          → 07/10 (rosso)
│   ├─ bodoni.html         → Bodoni (verde)
│   ├─ new-project.html    → template vuoto per il prossimo progetto (giallo)
│   └─ icon-site/          → il sito web di ICON, già integrato
├─ css/style.css         → font, colori, tutti gli stili
├─ js/main.js             → scramble, cover, transizioni
├─ js/pdf-viewer.js       → il visualizzatore PDF sfogliabile
├─ fonts/                 → i tuoi file Arial Narrow + Helvetica Neue
└─ assets/
    ├─ cover/              → le due immagini della copertina
    ├─ icon/photos  icon/posters
    ├─ ito/photos   ito/gadgets
    ├─ steven-meisel/photos
    ├─ 07-10/photos
    ├─ bodoni/photos
    └─ about/
```

---

## 1. Collegare una foto

Apri la pagina del progetto (es. `projects/icon.html`), cerca la sezione
"Gallery" e sostituisci un placeholder con la tua immagine:

```html
<!-- prima -->
<div class="placeholder-media">assets/icon/photos/01.jpg</div>

<!-- dopo -->
<img src="../assets/icon/photos/01.jpg" alt="Descrizione della foto">
```

1. Metti il file immagine dentro `assets/icon/photos/` (o la cartella del
   progetto giusto), chiamandolo `01.jpg`, `02.jpg`, ecc.
2. Fai la sostituzione sopra per ogni placeholder che vuoi riempire.
3. Se ti servono più foto di quelle già presenti, duplica una riga
   `<div class="placeholder-media">...</div>` e trasformala in un `<img>`.

## 2. Collegare un PDF (ora si sfoglia pagina per pagina)

Ogni PDF è già collegato come un visualizzatore vero e proprio, con
frecce avanti/indietro, numero di pagina, tasti freccia della tastiera e
swipe da telefono. Devi solo caricare il file al posto giusto:

```html
<div class="pdf-viewer" data-pdf="../assets/icon/icon-booklet.pdf"></div>
```

Guarda il valore di `data-pdf`: è il percorso dove deve trovarsi il file.
Metti semplicemente il tuo PDF in quel punto esatto (stesso nome, stessa
cartella) e ricarica la pagina — funziona subito, non devi cambiare altro
codice. Se il file non c'è ancora, il visualizzatore mostra un avviso
("Couldn't load the PDF...") invece di un iframe vuoto, così sai subito
cosa manca.

## 3. Collegare un video

**Da YouTube o Vimeo:**
1. Sul video, clicca "Condividi" → "Incorpora" (Embed) e copia il codice `<iframe>`.
2. Nella pagina del progetto, dentro `<div class="embed-video">`, incolla quell'iframe al posto del commento:

```html
<div class="embed-video">
  <iframe src="https://www.youtube.com/embed/IDVIDEO" allowfullscreen></iframe>
</div>
```

**Un tuo file video (mp4):** mettilo in `assets/icon/` e usa:
```html
<div class="embed-video">
  <video controls src="../assets/icon/video.mp4"></video>
</div>
```

## 4. Collegare un sito esterno (come ho fatto per ICON)

Questo vale sia per un sito codificato da te sia per un prototipo Figma.

**Se è un prototipo Figma:** in Figma vai su Share → scheda "Prototype" →
Copy link, poi incolla quel link nel bottone già pronto nella pagina
(sezione "Website"):
```html
<a class="link-external" href="INCOLLA-QUI-IL-LINK-FIGMA" target="_blank" rel="noopener">Open Figma prototype ↗</a>
```

**Se è un sito tuo, scritto in HTML/CSS/JS (come ICON):**
1. Apri la cartella del sito sul tuo computer e controlla che ci sia un
   file `index.html` direttamente dentro (non in una sottocartella).
2. Rinomina la cartella in modo semplice, senza spazi (es. `ito-site`).
3. Copia l'intera cartella dentro `projects/` del portfolio (in VS Code:
   trascinala nel pannello file a sinistra, dentro `projects`).
4. Nella pagina del progetto (es. `projects/ito.html`), nella sezione
   "Website", incolla questo (sostituendo `ito-site` col nome della tua
   cartella):
```html
<iframe src="ito-site/index.html" style="width:100%; height:70vh; border:1px solid #eee; border-radius:4px; margin-bottom:1.2rem;"></iframe>
<a class="link-external" href="ito-site/index.html" target="_blank" rel="noopener">Open the full site ↗</a>
```
5. Salva, ricarica con Live Server e controlla che il sito appaia dentro il riquadro.

Se preferisci, puoi anche mandarmelo tu (zip o anche solo i file uno per
uno) e te lo integro io allo stesso modo.

## 5. Aggiungere un progetto nuovo, da zero

1. Duplica `projects/new-project.html` e rinominalo (es. `projects/mio-progetto.html`).
2. Crea la cartella `assets/mio-progetto/` per le sue foto/pdf/video.
3. Apri il nuovo file e cambia:
   - il colore di sfondo dell'header (`style="background:#..."`, scegli un colore della tabella qui sotto o uno nuovo)
   - titolo, claim, e i valori di Course/Type/Year/Role/Team
   - il testo del progetto
4. Apri `work.html`, trova `.work-list`, e aggiungi una nuova riga copiando una di quelle esistenti:
```html
<a class="work-row reveal" href="projects/mio-progetto.html" data-transition data-color="#edda1c" data-label="Mio progetto">
  <span class="idx">06</span>
  <h2>Mio progetto</h2>
  <span class="tag">Categoria</span>
  <span class="year">2026</span>
  <span class="arrow">↗</span>
</a>
```
5. Fatto: il nuovo progetto compare nell'indice e ha la sua pagina.

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

## Font

- **Titoli** → `Arial Narrow Bold` (`fonts/ARIALNB.woff`) — lo stesso
  font usato nel PDF originale.
- **Testo** → `Helvetica Neue Medium` (`fonts/HelveticaNeueMedium.woff`).

## Cosa è cambiato in questa versione

- **Copertina**: uso direttamente le tue due immagini (`assets/cover/`).
  Quella semplice appare subito, quella con la griglia sfuma sopra con
  opacità crescente dopo il caricamento — ad ogni refresh/prima apertura.
  Tutta la copertina è cliccabile (o premi Invio) per entrare nel sito.
- **Cursore**: rimosso quello custom, ora è quello normale del sistema.
- **PDF sfogliabili**: sostituito l'iframe con un vero visualizzatore
  pagina-per-pagina (vedi punto 2 sopra).
- **Footer**: niente più particelle/coriandoli — solo la griglia sottile
  della quarta di copertina.
- **Responsive**: rivisto ogni layout a colonne (gallery, meta progetto,
  documenti/video affiancati, about) perché si impili correttamente su
  schermi piccoli, e non si allarghi troppo su monitor molto grandi.
- **About** non più in primo piano, e "Zaira Aiello" non è ripetuto in
  ogni pagina — solo un piccolo marchio "Z" che riporta alla copertina.

## Pubblicare sul tuo dominio

Sito statico puro, nessuna build: carica l'intera cartella
`zaira-portfolio` sull'hosting collegato al dominio, mantenendo
`index.html` nella root.

## Anteprima locale in VS Code

Estensione **Live Server** → apri `index.html` → tasto destro →
"Open with Live Server". (Il visualizzatore PDF ha bisogno di una
connessione internet attiva la prima volta, perché carica una libreria
esterna — PDF.js — via CDN.)
