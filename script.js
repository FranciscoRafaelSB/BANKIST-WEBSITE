'use strict';

///////////////////////////////////////
// Modal window

const x = 1;
const y = 2;

x - y;

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//TOPIC INTERSECTION OBSERVER API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, //element that the target is intersection
//   threshold: [0, 0.2], //the percetage of intersecion at which the observer callback will be called
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight.height);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//TOPIC REVEAL SECTIONS

const allSections = document.querySelectorAll('.section ');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  //guard clause
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//TOPIC LOADING IMAGES (LAZY LOADING)

const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);

const loadImages = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  //guard clause
  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0,
  rootMargin: '-100px',
});

imgTargets.forEach(img => imageObserver.observe(img));

//TOPIC SLIDER

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');

  let currSlide = 0;
  const maxSlides = slides.length;

  // slider.style.transform = 'scale(0.5) translateX(-200px)';
  // slider.style.overflow = 'visible';

  // slides.forEach(
  //   (slide, index) => (slide.style.transform = `translateX(${100 * index}%)`)
  //   //0%, 100%, 200%, 300%
  // );

  //FUNCTIONS
  const createDots = function () {
    slides.forEach((_, index) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide='${index}'></button>`
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

  const goToSlide = function (currSlide) {
    slides.forEach(
      (slide, index) =>
        (slide.style.transform = `translateX(${100 * (index - currSlide)}%)`)
      // -100%, 0%, 100%, 200%
    );
  };

  //Next slide
  const nextSlide = function () {
    currSlide === maxSlides - 1 ? (currSlide = 0) : currSlide++;

    goToSlide(currSlide);
    activeDot(currSlide);
  };

  const prevSlide = () => {
    if (currSlide === 0) currSlide = maxSlides - 1;
    else currSlide--;

    goToSlide(currSlide);
    activeDot(currSlide);
  };

  const init = function () {
    createDots();
    activeDot(0);
    goToSlide(0);
  };

  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;

      goToSlide(slide);
      activeDot(slide);
    }
  });
};

slider();
// TOPIC STICKY NAVIGATION

// const initialCoords = section1.getBoundingClientRect();
// // console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//TOPIC MENU FADE ANIMATION

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // console.log(link);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // console.log(siblings);
    const logo = link.closest('.nav').querySelector('img');
    // console.log(logo);

    siblings.forEach(element => {
      if (element !== link) element.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//LEC
//BIND CREATES A COPY IF THE FUCTION THAT IT'S CALLED ON
//and it will set the this keyword in this functiob call
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//TOPIC SCROLL

// document.querySelectorAll('.nav__link').forEach(el =>
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     // console.log('click');
//     // const id = e.currentTarget.;
//     const id = this.getAttribute('href');
//     console.log(id);
//     // id.scrollIntoView({ behavior: 'smooth' });
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// );

//1 add event listener to common parent element
//2 Determinate what element originated the event

document.querySelector('.nav__links').addEventListener('click', e => {
  // const href = e.target.href + '';
  console.log(e.target);

  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    console.log('click');
    // const id = e.currentTarget.;
    const id = e.target.getAttribute('href');
    console.log(id);
    // id.scrollIntoView({ behavior: 'smooth' });
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
  // console.log(href.);

  // if(e.target.h )
});

btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll (X/Y): ', window.pageXOffset, pageYOffset);

  // console.log(
  //   'height/width viewport: ',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  //OLD WAY
  // window.scrollTo(
  //   s1coords.x + window.pageXOffset,
  //   s1coords.y + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   right: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

//TOPIC TABBED COMPONENT
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const click = e.target.closest('.operations__tab');
  // console.log(click);

  //Guard clause
  if (!click) return;

  //remove the class list and current content
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabContent.forEach(currContent =>
    currContent.classList.remove('operations__content--active')
  );

  //Add just in the clicked
  click.classList.add('operations__tab--active');

  //Active content area
  // console.log(click.dataset.tab);

  document
    .querySelector(`.operations__content--${click.dataset.tab}`)
    .classList.add('operations__content--active');
});

//LECTURE
//TOPIC DOM TRAVERSING

/* const h1 = document.querySelector('h1');

//Going downwars: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orange';

//Going upwards
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('h1').style.background = 'var(--gradient-primary)';

//Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(el => {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
 */
//LECTURE
//TOPIC COOKIES
/* const header = document.querySelector('header');
console.log(header);

const message = document.createElement('div');

message.classList.add('cookie-message');

message.innerHTML =
  'We use cookies for improved fuctionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message );
header.append(message);
// header.prepend(message.cloneNode(true));

// header.before(message);
// header.after(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    console.log('click');
    // message.remove();
    message.parentElement.removeChild(message);
  });

//styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// console.log(getComputedStyle(message));
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px'; */

/* //Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalistic logo!';

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//Data attributes
console.log(logo.dataset.versionNumber);

//classes
logo.classList.add();
logo.classList.remove();
logo.classList.toggle();
logo.classList.contains();

//Don't use
logo.classList = 'rafa';
*/

/* const h1 = document.querySelector('h1');

console.log(h1);

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
}, 3000); */

// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };

//LECTURE RANDOM COLORS
//TOPIC BUBBLING
/* 
const ramdomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
console.log(ramdomInt(2, 8));

const randomColor = () =>
  `rgb(${ramdomInt(0, 255)},${ramdomInt(0, 255)},${ramdomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK: ', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //Stop propagation
  e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER: ', e.target, e.currentTarget);
  // console.log('click');
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV: ', e.target, e.currentTarget);
    // console.log('click');
  }
  // true
);

// console.log(Math.random() * );
 */

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML parsed and DOM tree built: ', e);
// });

// window.addEventListener('load', function (e) {
//   console.log('Page fully loaded: ', e);
// });

//Before the user is about to leave the page
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
