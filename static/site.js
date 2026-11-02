'use strict';

const pronunciationButton = document.getElementById('pronounce-inoculation');
const pronunciationStatus = document.getElementById('pronunciation-status');
pronunciationButton?.addEventListener('click', () => {
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    pronunciationStatus.textContent = 'Pronunciation is unavailable in this browser. Say: ih-nok-yuh-LAY-shun.';
    return;
  }
  window.speechSynthesis.cancel();
  const pronunciation = new SpeechSynthesisUtterance('inoculation');
  pronunciation.lang = 'en-US';
  pronunciation.rate = 0.85;
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find((voice) => voice.lang === 'en-US')
    || voices.find((voice) => voice.lang.startsWith('en'));
  if (voice) pronunciation.voice = voice;
  pronunciation.onstart = () => {
    pronunciationButton.setAttribute('aria-busy', 'true');
    pronunciationStatus.textContent = 'Playing pronunciation of inoculation.';
  };
  pronunciation.onend = () => {
    pronunciationButton.removeAttribute('aria-busy');
    pronunciationStatus.textContent = '';
  };
  pronunciation.onerror = (event) => {
    pronunciationButton.removeAttribute('aria-busy');
    if (event.error !== 'canceled' && event.error !== 'interrupted') {
      pronunciationStatus.textContent = 'Audio is unavailable. Say: ih-nok-yuh-LAY-shun.';
    }
  };
  window.speechSynthesis.speak(pronunciation);
});

renderMathInElement(document.body, {
  delimiters: [
    { left: '$$', right: '$$', display: true },
    { left: '$', right: '$', display: false }
  ],
  throwOnError: false
});

// Keep the LaTeX output inside its available width, including on phones.
const method = document.getElementById('method');
if (method) {
  const equations = [...method.querySelectorAll('.katex-display > .katex')];

  function fitEquations() {
    equations.forEach((equation) => { equation.style.fontSize = ''; });
    for (let pass = 0; pass < 2; pass += 1) {
      const measurements = equations.map((equation) => {
        const container = equation.closest('.equation > span') || equation.parentElement;
        const style = getComputedStyle(container);
        return {
          equation,
          available: container.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight),
          width: Math.max(equation.scrollWidth, equation.getBoundingClientRect().width),
          fontSize: parseFloat(getComputedStyle(equation).fontSize)
        };
      });
      measurements.forEach(({ equation, available, width, fontSize }) => {
        if (available > 4 && width > available - 2) {
          equation.style.fontSize = String(fontSize * (available - 2) / width) + 'px';
        }
      });
    }
    equations.forEach((equation) => {
      const targets = equation.closest('.method-equation, .algorithm-expression')?.nextElementSibling;
      if (targets?.matches('.method-targets, .algorithm-targets')) {
        targets.style.fontSize = getComputedStyle(equation).fontSize;
      }
    });
  }

  let frame;
  function scheduleFit() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(fitEquations);
  }

  let previousWidth;
  new ResizeObserver(([entry]) => {
    if (entry.contentRect.width !== previousWidth) {
      previousWidth = entry.contentRect.width;
      scheduleFit();
    }
  }).observe(method);
  method.querySelectorAll('details').forEach((details) => {
    details.addEventListener('toggle', scheduleFit);
  });
  document.fonts.ready.then(fitEquations);
  document.fonts.addEventListener('loadingdone', fitEquations);
  window.addEventListener('resize', scheduleFit);
  fitEquations();
}

const copyButton = document.getElementById('copy-citation');
copyButton?.addEventListener('click', async () => {
  const citation = document.getElementById('citation');
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(citation.textContent);
    status.textContent = 'Citation copied to clipboard.';
    copyButton.textContent = 'Copied!';
    setTimeout(() => { copyButton.textContent = 'Copy citation'; }, 2000);
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(citation);
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Citation selected. Press Ctrl+C or ⌘C to copy.';
  }
});
