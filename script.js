// Mobile menu
const toggleMenu = () => {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  const expanded = icon.getAttribute('aria-expanded') === 'true';

  menu.classList.toggle('open');
  icon.classList.toggle('open');
  icon.setAttribute('aria-expanded', String(!expanded));
};

// Theme handling
const themeButtons = [
  document.getElementById('modeToggle'),
  document.getElementById('modeToggle2'),
].filter(Boolean);

const themeIcons = document.querySelectorAll('.icon');

const enableDark = () => {
  document.body.setAttribute('theme', 'dark');
  localStorage.setItem('theme', 'dark');
  themeIcons.forEach((icon) => {
    const dark = icon.getAttribute('src-dark');
    if (dark) icon.src = dark;
  });
};

const enableLight = () => {
  document.body.removeAttribute('theme');
  localStorage.setItem('theme', 'light');
  themeIcons.forEach((icon) => {
    const light = icon.getAttribute('src-light');
    if (light) icon.src = light;
  });
};

const toggleTheme = () => {
  const current = document.body.getAttribute('theme');
  if (current === 'dark') enableLight();
  else enableDark();
};

// Initialize theme: respect saved pref, else system pref
(() => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    enableDark();
  } else if (saved === 'light') {
    enableLight();
  } else {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    prefersDark ? enableDark() : enableLight();
  }
})();

// Update on system changes if user hasn't explicitly chosen later
window.matchMedia &&
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      const saved = localStorage.getItem('theme');
      if (!saved) {
        e.matches ? enableDark() : enableLight();
      }
    });

// Bind buttons
themeButtons.forEach((btn) => btn.addEventListener('click', toggleTheme));
