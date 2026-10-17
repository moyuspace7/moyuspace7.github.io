// Inlined in every page head so navigation paints the saved theme immediately.
(() => {
  const key = 'moyu-theme';
  const valid = (value) => value === 'light' || value === 'dark';
  const root = document.documentElement;
  let activeTheme = 'light';
  const readTheme = () => {
    try {
      const saved = localStorage.getItem(key);
      if (valid(saved)) return saved;
      const legacy = localStorage.getItem('starlight-theme');
      if (valid(legacy)) {
        localStorage.setItem(key, legacy);
        return legacy;
      }
    } catch {}
    return activeTheme;
  };
  const updateControls = () => {
    const dark = root.dataset.theme === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('title', dark ? '切换到白天模式' : '切换到夜间模式');
    });
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#241e2a' : '#fff8f6');
  };
  const apply = (theme) => {
    activeTheme = theme;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    updateControls();
  };
  apply(readTheme());
  document.addEventListener('DOMContentLoaded', updateControls, { once: true });
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element) || !event.target.closest('[data-theme-toggle]')) return;
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(theme);
    try { localStorage.setItem(key, theme); } catch {}
  });
  // Browser Back/Forward can restore a page without rerunning its head script.
  window.addEventListener('pageshow', () => apply(readTheme()));
  window.addEventListener('storage', (event) => {
    if (event.key === key || event.key === null) apply(readTheme());
  });
})();
