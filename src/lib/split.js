// Minimal split-text helper (lines or chars) with mask wrappers for reveal animations.
export function splitLines(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(" ");
  const wordEls = [...el.querySelectorAll(".word")];
  const lines = [];
  let top = null;
  wordEls.forEach((w) => {
    const t = w.offsetTop;
    if (t !== top) { lines.push([]); top = t; }
    lines[lines.length - 1].push(w.textContent);
  });
  el.innerHTML = lines.map((l) => `<span class="line"><span>${l.join(" ")}</span></span>`).join(" ");
  return [...el.querySelectorAll(".line > span")];
}

export function splitChars(el) {
  const chars = [...el.textContent.trim()];
  el.innerHTML = chars.map((c) => `<span class="char"><span>${c === " " ? "&nbsp;" : c}</span></span>`).join("");
  return [...el.querySelectorAll(".char > span")];
}
