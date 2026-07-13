/* =========================================================
   ZAIRA AIELLO — DIGITAL PORTFOLIO
   main.js — all interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     1. ELASTIC CUSTOM CURSOR
     Un pallino segue il mouse "a molla" (con un piccolo
     ritardo), più un anello satellite ancora più lento —
     stesso spirito giocoso del cursore/companion di ma5a.com.
  --------------------------------------------------------- */
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  const trail = document.createElement("div");
  trail.className = "cursor-trail";
  document.body.append(cursor, trail);

  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  const pos1 = { ...mouse };
  const pos2 = { ...mouse };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animateCursor() {
    pos1.x += (mouse.x - pos1.x) * 0.35;
    pos1.y += (mouse.y - pos1.y) * 0.35;
    pos2.x += (mouse.x - pos2.x) * 0.12;
    pos2.y += (mouse.y - pos2.y) * 0.12;

    cursor.style.left = pos1.x + "px";
    cursor.style.top = pos1.y + "px";
    trail.style.left = pos2.x + "px";
    trail.style.top = pos2.y + "px";

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll("a, button, .work-row").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });


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
  --------------------------------------------------------- */
  const chaosBtn = document.createElement("button");
  chaosBtn.className = "chaos-toggle";
  chaosBtn.textContent = "chaos";
  chaosBtn.setAttribute("aria-label", "Toggle a bit of chaos");
  document.body.appendChild(chaosBtn);

  chaosBtn.addEventListener("click", () => {
    document.body.classList.toggle("chaos");
    chaosBtn.textContent = document.body.classList.contains("chaos") ? "calm" : "chaos";
  });


  /* ---------------------------------------------------------
     7. FOOTER PARTICLES — puntini colorati che fluttuano piano
  --------------------------------------------------------- */
  const canvas = document.querySelector("#footer-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h;
    const colors = ["#edda1c", "#f05123", "#222cf0", "#ff94cd", "#db2121", "#27a33c"];

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 26 }, () => ({
      x: Math.random(), y: Math.random(),
      r: 2 + Math.random() * 4,
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      c: colors[Math.floor(Math.random() * colors.length)],
    }));

    function tick() {
      ctx.clearRect(0, 0, w, h);
      dots.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > 1) d.vx *= -1;
        if (d.y < 0 || d.y > 1) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.c;
        ctx.globalAlpha = 0.6;
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }
    tick();
  }

});
