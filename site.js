'use strict';
const svgNS = 'http://www.w3.org/2000/svg';
document.querySelectorAll('.grooves').forEach(group => {
  for (let radius = 68; radius < 191; radius += 4) {
    const ring = document.createElementNS(svgNS, 'circle');
    ring.setAttribute('cx', '200'); ring.setAttribute('cy', '200'); ring.setAttribute('r', String(radius));
    group.append(ring);
  }
});
const art = document.querySelector('.hero-art');
const motionButton = document.querySelector('.motion-toggle');
if (art && motionButton) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function setPaused(paused) {
    art.classList.toggle('paused', paused);
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.setAttribute('aria-label', paused ? 'Resume spinning records' : 'Pause spinning records');
    motionButton.firstElementChild.textContent = paused ? '▷' : 'Ⅱ';
  }
  setPaused(reducedMotion.matches);
  if (reducedMotion.matches) motionButton.hidden = true;
  reducedMotion.addEventListener('change', event => { setPaused(event.matches); motionButton.hidden = event.matches; });
  motionButton.addEventListener('click', () => setPaused(!art.classList.contains('paused')));
}
const tabs = [...document.querySelectorAll('[role="tab"]')];
function activateTab(tab, focus = false) {
  tabs.forEach(candidate => {
    const selected = candidate === tab;
    candidate.setAttribute('aria-selected', String(selected));
    candidate.tabIndex = selected ? 0 : -1;
    document.getElementById(candidate.getAttribute('aria-controls')).hidden = !selected;
  });
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
    if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
    if (event.key === 'Home') next = tabs[0];
    if (event.key === 'End') next = tabs[tabs.length - 1];
    if (next) { event.preventDefault(); activateTab(next, true); }
  });
});
