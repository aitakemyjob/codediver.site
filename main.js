// CodeDiver site interactions: agent snippet tabs, copy buttons, a
// screenshot lightbox, and an OS-aware download button. No dependencies.

/** Switches the visible agent configuration snippet. */
function initTabs() {
  const tabs = document.querySelectorAll('.tabs [role="tab"]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
      document.querySelectorAll('.connect .snippet[data-panel]').forEach((p) => {
        p.hidden = p.dataset.panel !== tab.dataset.tab;
      });
    });
  });
}

/** Copies a snippet's code (minus leading comment lines) to the clipboard. */
function initCopyButtons() {
  document.querySelectorAll('.snippet .copy').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.parentElement.querySelector('code').textContent
        .split('\n')
        .filter((line) => !line.trim().startsWith('//'))
        .join('\n')
        .trim();
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied';
        btn.classList.add('done');
      } catch {
        btn.textContent = 'Select & copy';
      }
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.classList.remove('done');
      }, 1600);
    });
  });
}

/** Opens screenshots full-size; closes on click, the × button or Escape. */
function initLightbox() {
  const box = document.getElementById('lightbox');
  const img = box.querySelector('img');
  const caption = box.querySelector('.lightbox-caption');
  let lastFocus = null;
  const close = () => {
    box.hidden = true;
    document.body.style.overflow = '';
    lastFocus?.focus();
  };
  document.querySelectorAll('.shot').forEach((fig) => {
    fig.tabIndex = 0;
    fig.setAttribute('role', 'button');
    const open = () => {
      const thumb = fig.querySelector('img');
      lastFocus = fig;
      img.src = fig.dataset.full || thumb.src;
      img.alt = thumb.alt;
      caption.textContent = fig.querySelector('figcaption')?.textContent ?? '';
      box.hidden = false;
      document.body.style.overflow = 'hidden';
      box.querySelector('.lightbox-close').focus();
    };
    fig.addEventListener('click', open);
    fig.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  });
  box.addEventListener('click', (e) => {
    if (e.target !== img) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !box.hidden) close();
  });
}

/** Labels the hero download button for the visitor's operating system. */
function initDownloadLabel() {
  const btn = document.getElementById('download-btn');
  const ua = navigator.userAgent;
  const os = /Mac/i.test(ua) ? 'macOS' : /Win/i.test(ua) ? 'Windows' : /Linux/i.test(ua) ? 'Linux' : '';
  if (btn && os) btn.textContent = `Download for ${os}`;
}

initTabs();
initCopyButtons();
initLightbox();
initDownloadLabel();
