function initGalleryAutoScroll() {
  if (typeof window === 'undefined') return;
  const container = document.querySelector('.gallery-carousel');
  if (!container) return;
  const track = container.querySelector('.gallery-track');
  if (!track) return;
  const items = Array.from(track.children);
  if (!items.length) return;

  let gap = parseInt(getComputedStyle(track).gap) || 16;
  let idx = 0;
  let timer = null;

  function computeLayout() {
    const containerRect = container.getBoundingClientRect();
    const itemRect = items[0].getBoundingClientRect();
    const itemWidth = itemRect.width;
    // center the active item
    const offset = (containerRect.width - itemWidth) / 2;
    const translateX = Math.round(offset - idx * (itemWidth + gap));
    track.style.transform = `translateX(${translateX}px)`;
    items.forEach((it, i) => it.classList.toggle('active', i === idx));
  }

  function next() {
    idx = (idx + 1) % items.length;
    computeLayout();
  }

  function start() {
    stop();
    timer = setInterval(next, 5000);
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  // re-calc gap on resize (some browsers report 0 initially)
  window.addEventListener('resize', () => {
    gap = parseInt(getComputedStyle(track).gap) || gap;
    computeLayout();
  });

  // pause on hover/focus
  container.addEventListener('mouseenter', stop);
  container.addEventListener('mouseleave', start);
  container.addEventListener('focusin', stop);
  container.addEventListener('focusout', start);

  // initial layout after images load
  let loaded = 0;
  items.forEach(imgWrap => {
    const img = imgWrap.querySelector('img');
    if (!img) { loaded++; return; }
    if (img.complete) { loaded++; }
    else img.addEventListener('load', () => { loaded++; if (loaded === items.length) computeLayout(); });
  });
  // fallback layout
  setTimeout(computeLayout, 80);
  start();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initGalleryAutoScroll);
else initGalleryAutoScroll();

export default initGalleryAutoScroll;
