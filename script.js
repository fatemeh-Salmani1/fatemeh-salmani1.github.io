const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
const storedTheme = localStorage.getItem('theme');

if (storedTheme === 'dark') {
  root.dataset.theme = 'dark';
}

function updateToggleLabel() {
  const darkModeIsActive = root.dataset.theme === 'dark';
  toggle.setAttribute(
    'aria-label',
    darkModeIsActive ? 'Switch to light mode' : 'Switch to dark mode'
  );
}

updateToggleLabel();

toggle.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';

  if (nextTheme === 'dark') {
    root.dataset.theme = 'dark';
  } else {
    delete root.dataset.theme;
  }

  localStorage.setItem('theme', nextTheme);
  updateToggleLabel();
});
