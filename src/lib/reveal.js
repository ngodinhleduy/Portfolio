import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitLines, splitChars } from "./split.js";

gsap.registerPlugin(ScrollTrigger);

// Elements marked data-immediate (hero content) play right after boot.
// Everything else plays once when it enters the viewport.
function trigger(el, start) {
  return el.hasAttribute("data-immediate") ? undefined : { trigger: el, start, once: true };
}

export function initReveals() {
  document.querySelectorAll("[data-split]").forEach((el) => {
    const mode = el.dataset.split;
    const targets = mode === "chars" ? splitChars(el) : splitLines(el);
    gsap.set(targets, { yPercent: 110 });
    gsap.to(targets, {
      yPercent: 0,
      duration: 1.2,
      ease: "expo.out",
      stagger: mode === "chars" ? 0.02 : 0.08,
      scrollTrigger: trigger(el, "top 85%"),
    });
  });

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 32 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", delay: el.hasAttribute("data-immediate") ? 0.4 : 0, scrollTrigger: trigger(el, "top 88%") }
    );
  });

  document.querySelectorAll("[data-parallax]").forEach((el) => {
    const amt = parseFloat(el.dataset.parallax) || 0.1;
    gsap.fromTo(
      el,
      { yPercent: -amt * 100 },
      { yPercent: amt * 100, ease: "none", scrollTrigger: { trigger: el, scrub: true } }
    );
  });
}
