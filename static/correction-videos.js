'use strict';

(() => {
  const figure = document.getElementById('correction-phases');
  if (!figure) return;
  const videos = [...figure.querySelectorAll('video')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let wantsPlayback = !reducedMotion.matches;
  let inView = false;

  function updatePlayback() {
    videos.forEach((video) => {
      // Keep manual playback available when automatic motion is disabled.
      video.controls = !wantsPlayback;
      if (wantsPlayback && inView && !document.hidden) {
        video.play().catch((error) => {
          // A browser may require the visitor to start playback explicitly.
          if (error.name === 'NotAllowedError' && wantsPlayback) {
            wantsPlayback = false;
            updatePlayback();
          }
        });
      } else {
        video.pause();
      }
    });
  }

  videos.forEach((video) => {
    video.muted = true;
  });
  reducedMotion.addEventListener('change', () => {
    wantsPlayback = !reducedMotion.matches;
    updatePlayback();
  });
  document.addEventListener('visibilitychange', updatePlayback);
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    updatePlayback();
  }, { rootMargin: '100px' }).observe(figure);
  updatePlayback();
})();
