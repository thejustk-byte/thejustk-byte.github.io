(() => {
  const backdrop = document.getElementById('bubble');
  const bubble = backdrop.querySelector('.bubble');
  const content = document.getElementById('bubble-content');
  const kicker = document.getElementById('bubble-kicker');
  const closeButton = backdrop.querySelector('.bubble-close');
  const stage = document.querySelector('.stage');
  const topics = [...document.querySelectorAll('[data-topic]')];
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  let returnFocus = null;
  let closeTimer = 0;
  const labels = { about: 'PROFILE / 01', career: 'EXPERIENCE / 02', skills: 'TOOLKIT / 03', education: 'EDUCATION / 04', contact: 'CONNECTION / 05' };

  function openBubble(topic) {
    const template = document.getElementById(`content-${topic}`);
    if (!template) return;
    window.clearTimeout(closeTimer);
    returnFocus = document.activeElement;
    content.replaceChildren(template.content.cloneNode(true));
    kicker.textContent = labels[topic] || 'PORTFOLIO';
    backdrop.hidden = false;
    stage.inert = true;
    bubble.classList.remove('is-closing');
    requestAnimationFrame(() => bubble.focus());
  }

  function closeBubble() {
    if (backdrop.hidden || bubble.classList.contains('is-closing')) return;
    bubble.classList.add('is-closing');
    stage.inert = false;
    closeTimer = window.setTimeout(() => {
      backdrop.hidden = true;
      content.replaceChildren();
      if (returnFocus && typeof returnFocus.focus === 'function') returnFocus.focus();
    }, 190);
  }

  topics.forEach((button) => button.addEventListener('click', () => openBubble(button.dataset.topic)));
  closeButton.addEventListener('click', closeBubble);
  backdrop.addEventListener('pointerdown', (event) => { if (event.target === backdrop) closeBubble(); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeBubble();
    if (event.key === 'Tab' && !backdrop.hidden) {
      const focusable = [...bubble.querySelectorAll('a[href], button:not([disabled])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === bubble)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
})();

