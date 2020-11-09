'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const header = document.querySelector('.header');

const allSections = document.querySelectorAll('.section');
const section1 = document.querySelector('#section--1');

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const navHeight = nav.getBoundingClientRect().height;

const imgTargets = document.querySelectorAll('img[data-src]');

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const dotContainer = document.querySelector('.dots');

const maxSlide = slides.length;
let currentSlide = 0;

// --------------- Functions  ---------------
const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const handleHover = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(element => {
      if (element !== link) element.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

const goToSlide = function (currentSlide) {
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`)
  );
  activeDot(currentSlide);
};

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) currentSlide = 0;
  else currentSlide++;

  goToSlide(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) currentSlide = maxSlide - 1;
  else currentSlide--;

  goToSlide(currentSlide);
};

const createDots = function () {
  slides.forEach((_, index) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};

const activeDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const init = function () {
  createDots();
  goToSlide(0);
};

// --------------- Event handlers  ---------------

// Open and close modal
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button scrolling
btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation (using event delegation)
navLinks.addEventListener('click', function (event) {
  event.preventDefault();

  if (event.target.classList.contains('nav__link')) {
    document
      .querySelector(event.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
tabsContainer.addEventListener('click', function (event) {
  event.preventDefault();
  const clicked = event.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // Activate tab and content area
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation bar
const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider component
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (event) {
  (event.key === 'ArrowLeft' && prevSlide()) ||
    (event.key === 'ArrowRight' && nextSlide());
});

dotContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('dots__dot')) {
    const { slide } = event.target.dataset;
    goToSlide(slide);
  }
});

init();
