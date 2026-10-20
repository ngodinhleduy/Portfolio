import gsap from "gsap";

export function initCursor() {
  const cursor = document.querySelector("[data-cursor]");
  if (!cursor || !window.matchMedia("(hover: hover)").matches) return;
  const xTo = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power3" });
  window.addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); });
  document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
    el.addEventListener("pointerenter", () => cursor.classList.add("is-hover"));
    el.addEventListener("pointerleave", () => cursor.classList.remove("is-hover"));
  });
}

export function initMagnetic(strength = 0.35) {
  if (!window.matchMedia("(hover: hover)").matches) return;
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    });
    el.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
  });
}
