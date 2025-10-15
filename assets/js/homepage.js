
(function () {
const btn = document.querySelector('.theme-toggle');

// Respect saved theme; else respect system preference on first visit
const saved = localStorage.getItem('theme');
if (saved === 'light') {
    document.body.classList.add('theme-light');
} else if (!saved) {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    if (prefersLight) document.body.classList.add('theme-light');
}

function syncToggleUI() {
    const isLight = document.body.classList.contains('theme-light');
    btn.textContent = isLight ? '🌙' : '☀️';
    const label = isLight ? 'Switch to dark theme' : 'Switch to light theme';
    btn.setAttribute('aria-label', label);
    btn.title = label;
    btn.setAttribute('aria-pressed', String(isLight));
}
syncToggleUI();

// Toggle + persist
btn.addEventListener('click', () => {
    const isLightNow = document.body.classList.toggle('theme-light');
    localStorage.setItem('theme', isLightNow ? 'light' : 'dark');
    syncToggleUI();
});

// Optional: react to system theme changes if user never toggled
const media = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)');
if (media && saved == null) {
    media.addEventListener('change', (e) => {
    if (localStorage.getItem('theme') == null) {
        document.body.classList.toggle('theme-light', e.matches);
        syncToggleUI();
    }
    });
}
})();
