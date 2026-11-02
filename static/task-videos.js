'use strict';

(() => {
  const grid = document.querySelector('.task-grid');
  const videos = [...(grid?.querySelectorAll('video') || [])];
  if (!videos.length) return;

  const visible = (video) => !video.closest('[hidden]');
  const blocked = new Set();

  function playVideo(video, restart = false) {
    if (!visible(video)) return;
    blocked.delete(video);
    video.autoplay = true;
    video.preload = 'auto';
    video.playbackRate = 2;
    if (video.readyState === 0) video.load();
    if (restart) video.currentTime = 0;
    video.play().catch((error) => {
      if (error.name === 'NotAllowedError' && visible(video)) blocked.add(video);
    });
  }

  videos.forEach((video) => {
    const frame = document.createElement('div');
    frame.className = 'task-video-frame';
    video.before(frame);
    frame.append(video);
    const speed = document.createElement('span');
    speed.className = 'task-video-speed';
    speed.textContent = '2x speed';
    frame.append(speed);
    video.defaultPlaybackRate = 2;
    video.playbackRate = 2;
    video.addEventListener('ratechange', () => {
      speed.textContent = `${video.playbackRate}x speed`;
    });
    video.autoplay = visible(video);
    video.loop = true;
    video.muted = true;
    video.addEventListener('play', () => {
      if (!visible(video)) video.pause();
    });
    if (visible(video)) playVideo(video);
    else video.pause();
  });

  grid.querySelectorAll('.failure-carousel').forEach((carousel) => {
    const slides = [...carousel.querySelectorAll('.failure-slide')];
    const count = carousel.querySelector('.failure-count');
    let index = Math.max(0, slides.findIndex((slide) => !slide.hidden));
    slides.forEach((slide, i) => { slide.setAttribute('aria-label', `${i + 1} of ${slides.length}`); });
    count.textContent = `${index + 1} / ${slides.length}`;
    function change(direction) {
      const previous = slides[index].querySelector('video');
      previous.autoplay = false;
      previous.pause();
      blocked.delete(previous);
      index = (index + direction + slides.length) % slides.length;
      slides.forEach((slide, i) => { slide.hidden = i !== index; });
      count.textContent = `${index + 1} / ${slides.length}`;
      playVideo(slides[index].querySelector('video'), true);
    }
    carousel.querySelector('.failure-prev').addEventListener('click', () => change(-1));
    carousel.querySelector('.failure-next').addEventListener('click', () => change(1));
  });

  // Retry only videos whose autoplay was blocked by the browser.
  grid.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('.failure-controls')) {
      [...blocked].filter(visible).forEach((video) => playVideo(video));
    }
  });
})();
