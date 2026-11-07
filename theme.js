// Run in the head so the chosen palette is in place before the page is drawn.
(() => {
  const key = 'fang-ventures-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;

  function savedChoice() {
    try {
      const value = localStorage.getItem(key);
      return value === 'light' || value === 'dark' ? value : 'system';
    } catch {
      return 'system';
    }
  }

  let choice = savedChoice();

  function apply() {
    const mode = choice === 'system' ? (system.matches ? 'dark' : 'light') : choice;
    root.dataset.appearance = mode;
    const control = document.getElementById('fv-appearance');
    if (control) control.value = choice;
    const tint = document.querySelector('meta[name="theme-color"]');
    if (tint) tint.content = getComputedStyle(root).getPropertyValue('--fv-browser-color').trim() || (mode === 'dark' ? '#132027' : '#f7f6f0');
  }

  apply();
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.getElementById('fv-appearance').addEventListener('change', event => {
      choice = event.target.value;
      try {
        if (choice === 'system') localStorage.removeItem(key);
        else localStorage.setItem(key, choice);
      } catch { /* Keep the selected appearance for this page if storage is unavailable. */ }
      apply();
    });
  });
  system.addEventListener('change', apply);
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      choice = savedChoice();
      apply();
    }
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      choice = savedChoice();
      apply();
    }
  });
})();
