let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

export const scrollToId = (target) => {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  }
};
