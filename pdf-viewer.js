/* =========================================================
   ZAIRA AIELLO — DIGITAL PORTFOLIO
   pdf-viewer.js — turns a <div class="pdf-viewer" data-pdf="...">
   into a browsable, page-by-page PDF viewer (uses PDF.js,
   loaded via CDN in the project pages).
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const viewers = document.querySelectorAll(".pdf-viewer[data-pdf]");
  if (!viewers.length || typeof pdfjsLib === "undefined") return;

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  viewers.forEach(initViewer);

  async function initViewer(el) {
    const url = el.dataset.pdf;

    el.innerHTML = `
      <div class="pdf-stage">
        <canvas class="pdf-canvas"></canvas>
      </div>
      <div class="pdf-controls">
        <button type="button" class="pdf-prev" aria-label="Previous page">←</button>
        <span class="pdf-page-info">– / –</span>
        <button type="button" class="pdf-next" aria-label="Next page">→</button>
      </div>
    `;

    const stage = el.querySelector(".pdf-stage");
    const canvas = el.querySelector(".pdf-canvas");
    const ctx = canvas.getContext("2d");
    const info = el.querySelector(".pdf-page-info");
    const prevBtn = el.querySelector(".pdf-prev");
    const nextBtn = el.querySelector(".pdf-next");

    let pdf = null;
    let page = 1;
    let total = 1;
    let rendering = false;

    try {
      pdf = await pdfjsLib.getDocument(url).promise;
      total = pdf.numPages;
    } catch (err) {
      el.innerHTML = `<p style="padding:2rem; color:#999; font-size:.9rem;">
        Couldn't load the PDF at <code>${url}</code>. Make sure the file
        is uploaded at that exact path.</p>`;
      return;
    }

    async function render() {
      if (rendering) return;
      rendering = true;

      const pdfPage = await pdf.getPage(page);
      const containerWidth = stage.clientWidth || 800;
      const base = pdfPage.getViewport({ scale: 1 });
      const scale = (containerWidth / base.width) * (window.devicePixelRatio || 1);
      const viewport = pdfPage.getViewport({ scale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = "100%";
      canvas.style.height = "auto";

      await pdfPage.render({ canvasContext: ctx, viewport }).promise;

      info.textContent = `${page} / ${total}`;
      prevBtn.disabled = page <= 1;
      nextBtn.disabled = page >= total;
      rendering = false;
    }

    function goPrev() { if (page > 1) { page--; render(); } }
    function goNext() { if (page < total) { page++; render(); } }

    prevBtn.addEventListener("click", goPrev);
    nextBtn.addEventListener("click", goNext);

    el.setAttribute("tabindex", "0");
    el.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    });

    // swipe left/right on touch devices
    let touchX = null;
    stage.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (dx > 40) goPrev();
      else if (dx < -40) goNext();
      touchX = null;
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(render, 150);
    });

    render();
  }
});
