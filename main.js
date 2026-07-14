/* =========================================================
   ZAIRA AIELLO — DIGITAL PORTFOLIO
   main.js — all interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     1. (custom cursor removed — using the normal system cursor)
  --------------------------------------------------------- */


  /* ---------------------------------------------------------
     2. SCRAMBLE TEXT EFFECT
     I titoli con [data-scramble] si "ricompongono" lettera
     per lettera al caricamento e al passaggio del mouse.
  --------------------------------------------------------- */
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  function scramble(el) {
    const original = el.textContent;
    let frame = 0;
    const totalFrames = 18;
    const interval = setInterval(() => {
      el.textContent = original
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < (frame / totalFrames) * original.length) return original[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      frame++;
      if (frame > totalFrames) {
        el.textContent = original;
        clearInterval(interval);
      }
    }, 35);
  }

  document.querySelectorAll("[data-scramble]").forEach((el) => {
    scramble(el);
    el.addEventListener("mouseenter", () => scramble(el));
  });


  /* ---------------------------------------------------------
     3. REVEAL ON SCROLL
  --------------------------------------------------------- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));


  /* ---------------------------------------------------------
     4. HOVER PREVIEW ON THE WORK INDEX (work.html)
     Una piccola immagine/colore segue il cursore mentre passi
     sopra le righe della lista progetti — trucco "da sito
     creativo" preso da tanti case-study index (tipo jackygrob
     e ma5a): il preview appare vicino al mouse, non fisso.
  --------------------------------------------------------- */
  const preview = document.querySelector(".hover-preview");
  if (preview) {
    let px = 0, py = 0, tx = 0, ty = 0;
    window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });

    function movePreview() {
      px += (tx - px) * 0.18;
      py += (ty - py) * 0.18;
      preview.style.left = px + "px";
      preview.style.top = py + "px";
      requestAnimationFrame(movePreview);
    }
    movePreview();

    document.querySelectorAll(".work-row").forEach((row) => {
      row.addEventListener("mouseenter", () => {
        preview.style.background = row.dataset.color || "#1a1919";
        preview.textContent = row.dataset.label || "";
        preview.classList.add("show");
      });
      row.addEventListener("mouseleave", () => preview.classList.remove("show"));
    });
  }


  /* ---------------------------------------------------------
     5. PAGE TRANSITION — wipe colorato tra una pagina e l'altra
  --------------------------------------------------------- */
  const panel = document.createElement("div");
  panel.className = "page-transition";
  document.body.appendChild(panel);

  document.querySelectorAll("a[data-transition]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || link.target === "_blank") return;
      e.preventDefault();
      panel.style.background = link.dataset.color || getComputedStyle(document.documentElement).getPropertyValue("--grey");
      panel.classList.add("enter");
      setTimeout(() => { window.location.href = href; }, 480);
    });
  });


  /* ---------------------------------------------------------
     6. CHAOS TOGGLE
     Bottone giocoso in basso a destra: attiva un piccolo
     "wobble" sui titoli e uno stile diverso per il cursore.
     Tono scherzoso preso dal cookie-banner di ma5a.com
     ("can I use cookies to make your experience better? ok /
     no thanks") — qui diventa un easter egg innocuo.
  --------------------------------------------------------- 
  if (!document.body.classList.contains("intro-page")) {
    const chaosBtn = document.createElement("button");
    chaosBtn.className = "chaos-toggle";
    chaosBtn.textContent = "chaos";
    chaosBtn.setAttribute("aria-label", "Toggle a bit of chaos");
    document.body.appendChild(chaosBtn);

    chaosBtn.addEventListener("click", () => {
      document.body.classList.toggle("chaos");
      chaosBtn.textContent = document.body.classList.contains("chaos") ? "calm" : "chaos";
    });
  }
*/

  /* ---------------------------------------------------------
     7. INTRO COVER — the grid-version image fades in over the
     plain one shortly after load; clicking/pressing Enter
     wipes into the real site (work.html).
  --------------------------------------------------------- */
  const introEl = document.querySelector("#intro");

  if (introEl) {
    setTimeout(() => introEl.classList.add("ready"), 400);

    function enterSite() {
      panel.style.background = introEl.dataset.color || "#1a1919";
      panel.classList.add("enter");
      setTimeout(() => { window.location.href = "work.html"; }, 480);
    }
    introEl.addEventListener("click", enterSite);
    introEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); enterSite(); }
    });
  }

});
