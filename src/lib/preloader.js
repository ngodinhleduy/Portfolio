import gsap from "gsap";

export function runPreloader() {
  const root = document.querySelector("[data-preloader]");
  const count = document.querySelector("[data-preloader-count]");
  if (!root) return Promise.resolve();
  const state = { n: 0 };
  return new Promise((resolve) => {
    gsap.timeline({ onComplete: resolve })
      .to(state, { n: 100, duration: 1.4, ease: "power2.inOut", onUpdate: () => (count.textContent = Math.round(state.n)) })
      .to(count, { yPercent: -100, autoAlpha: 0, duration: 0.5, ease: "expo.in" })
      .to(root, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.2")
      .set(root, { display: "none" });
  });
}
