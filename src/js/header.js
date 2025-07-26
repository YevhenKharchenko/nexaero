const contextMenu = document.querySelector('.context-menu');
const menuBtn = document.querySelector('.nav-btn');
const closeContextBtn = document.querySelector('.close-btn');

const menu = document.querySelector('.menu');
const contextMenuBtn = document.querySelector('.menu-btn');

menuBtn.addEventListener('click', onMenuButtonClick);
contextMenuBtn.addEventListener('click', onContextMenuButtonClick);

let contextMenuIsOpen = false;
let menuIsOpen = false;

function onMenuButtonClick() {
  if (contextMenuIsOpen) return;

  contextMenuIsOpen = true;
  contextMenu.classList.add('is-open');
  menuBtn.classList.add('closed');
  closeContextBtn.classList.add('is-open');

  contextMenu.addEventListener('click', onContextMenuLinkClick);
  closeContextBtn.addEventListener('click', onCloseContextButtonClick);
  document.addEventListener('click', onOutsideMenuClick);
}

function onContextMenuButtonClick() {
  if (!menuIsOpen) {
    menuIsOpen = true;
    menu.classList.add('menu-is-open');

    menu.addEventListener('click', onMenuLinkClick);
    document.addEventListener('click', onOutsideContextMenuClick);
  } else {
    menuIsOpen = false;
    menu.classList.remove('menu-is-open');

    menu.removeEventListener('click', onMenuLinkClick);
    document.removeEventListener('click', onOutsideContextMenuClick);
  }
}

function onCloseContextButtonClick() {
  contextMenuIsOpen = false;
  contextMenu.classList.remove('is-open');
  closeContextBtn.classList.remove('is-open');
  menuBtn.classList.remove('closed');

  contextMenu.removeEventListener('click', onContextMenuLinkClick);
  closeContextBtn.removeEventListener('click', onCloseContextButtonClick);
  document.removeEventListener('click', onOutsideMenuClick);
}

function onMenuLinkClick(e) {
  if (e.target.nodeName === 'A') {
    onContextMenuButtonClick();
  }
}

function onContextMenuLinkClick(e) {
  if (e.target.nodeName === 'A') {
    onCloseContextButtonClick();
  }
}

function onOutsideContextMenuClick(e) {
  const isClickInsideMenu = menu.contains(e.target);
  const isClickOnMenuBtn = contextMenuBtn.contains(e.target);

  if (!isClickInsideMenu && !isClickOnMenuBtn) {
    onContextMenuButtonClick();
  }
}

function onOutsideMenuClick(e) {
  const isClickInsideMenu = contextMenu.contains(e.target);
  const isClickOnMenuBtn = menuBtn.contains(e.target);
  const isClickOnCloseBtn = closeContextBtn.contains(e.target);

  if (!isClickInsideMenu && !isClickOnMenuBtn && !isClickOnCloseBtn) {
    onCloseContextButtonClick();
  }
}

const navLinks = document.querySelectorAll('.nav-list-link');
const sectionIds = Array.from(navLinks).map(link =>
  link.getAttribute('href').replace('./index.html#', '')
);

const sections = sectionIds
  .map(id => document.getElementById(id))
  .filter(Boolean);

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const navLink = document.querySelector(
      `.nav-list-link[href="./index.html#${id}"]`
    );

    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLink?.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

function updateMenuPosition() {
  const vw = document.documentElement.clientWidth;
  const offset = (vw - 1440) / 2 + 80;
  const menu = document.querySelector('.menu');
  if (menu) {
    menu.style.right = `${offset}px`;
  }
}

window.addEventListener('resize', updateMenuPosition);
window.addEventListener('DOMContentLoaded', updateMenuPosition);
