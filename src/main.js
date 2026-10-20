import { initSmoothScroll } from "./lib/smooth-scroll.js";
import { initReveals } from "./lib/reveal.js";
import { runPreloader } from "./lib/preloader.js";
import { initCursor, initMagnetic } from "./lib/cursor.js";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function boot() {
  const lenis = initSmoothScroll();
  lenis.stop();
  if (!reduced) await runPreloader();
  else document.querySelector("[data-preloader]")?.remove();
  lenis.start();
  initReveals();
  initCursor();
  initMagnetic();
  tickLocalTime();
}

function tickLocalTime() {
  const el = document.querySelector("[data-local-time]");
  if (!el) return;
  const fmt = () => (el.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  fmt();
  setInterval(fmt, 30_000);
}

// Do not let a slow or blocked font request hold the page hostage.
const fontsReady = document.fonts?.ready ?? Promise.resolve();
Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1500))]).then(boot);
