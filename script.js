const toggleMenu = () => {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');

  menu.classList.toggle('open');
  icon.classList.toggle('open');
};

// Dark & Light mode
const btn = document.getElementById('modeToggle');
const btn2 = document.getElementById('modeToggle2');
const themeIcons = document.querySelectorAll('.icon');
const currentTheme = localStorage.getItem('theme');

const setDarkMode = () => {
  document.body.setAttribute('theme', 'dark');
  localStorage.setItem('theme', 'dark');

  themeIcons.forEach((icon) => {
    icon.src = icon.getAttribute('src-dark');
  });
};

const setLightMode = () => {
  document.body.removeAttribute('theme');
  localStorage.setItem('theme', 'light');

  themeIcons.forEach((icon) => {
    icon.src = icon.getAttribute('src-light');
  });
};

const setTheme = () => {
  let currentTheme = document.body.getAttribute('theme');

  if (currentTheme === 'dark') {
    setLightMode();
  } else {
    setDarkMode();
  }
};

if (currentTheme === 'dark') {
  setDarkMode();
}

btn.addEventListener('click', () => {
  setTheme();
});

btn2.addEventListener('click', () => {
  setTheme();
});
