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

const projectsViewport = document.querySelector('.projects-viewport');
const projectsGrid = document.querySelector('.projects-grid');
const showMore = document.querySelector('.projects-show-more');
const extraProjects = [...projectsGrid.children].slice(4);

if (extraProjects.length) {
  projectsViewport.classList.add('is-collapsed');
  extraProjects.forEach(card => {
    card.inert = true;
    card.setAttribute('aria-hidden', 'true');
  });
  showMore.hidden = false;

  function sizeProjectPreview() {
    if (showMore.getAttribute('aria-expanded') === 'true') return;
    const nextCard = extraProjects[0].getBoundingClientRect();
    const viewport = projectsViewport.getBoundingClientRect();
    projectsViewport.style.maxHeight = `${nextCard.top - viewport.top + 64}px`;
  }

  sizeProjectPreview();
  new ResizeObserver(sizeProjectPreview).observe(projectsGrid);

  showMore.addEventListener('click', () => {
    showMore.setAttribute('aria-expanded', 'true');
    projectsViewport.classList.remove('is-collapsed');
    projectsViewport.style.maxHeight = '';
    extraProjects.forEach(card => {
      card.inert = false;
      card.removeAttribute('aria-hidden');
    });
    const firstLink = extraProjects[0].matches('a')
      ? extraProjects[0] : extraProjects[0].querySelector('a');
    firstLink?.focus({ preventScroll: true });
    showMore.hidden = true;
  });
}
