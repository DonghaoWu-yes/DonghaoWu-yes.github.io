const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.site-menu');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('open', !isOpen);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const navLinks = [...document.querySelectorAll('.site-menu a[href^="#"]')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));
}

document.querySelectorAll('.map-node').forEach((node) => {
  node.addEventListener('pointerenter', () => node.setAttribute('data-active', 'true'));
  node.addEventListener('pointerleave', () => node.removeAttribute('data-active'));
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
