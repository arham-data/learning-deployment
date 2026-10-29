import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrollToId } from '../lib/scroll';

const HERO_FRONT = 'https://picsum.photos/seed/leaf-temple/900/1200';
const HERO_BACK = 'https://picsum.photos/seed/storm-clouds/700/500';
const HERO_PILL = 'https://picsum.photos/seed/ember-spark/320/160';

const go = (e, target) => {
  e.preventDefault();
  scrollToId(target);
};

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const overrides = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.25 });
      tl.from('.hero-kicker', { y: 26, opacity: 0, duration: 0.7 })
        .from('.hero-title .line-inner', { yPercent: 118, duration: 1.15, stagger: 0.13 }, '-=0.35')
        .from(
          '.title-pill',
          { scaleX: 0, opacity: 0, duration: 0.9, ease: 'back.out(1.7)', transformOrigin: 'left center' },
          '-=0.7'
        )
        .from('.hero-sub', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-cta .btn', { y: 26, opacity: 0, duration: 0.7, stagger: 0.09 }, '-=0.55')
        .from('.hs-in', { y: 14, opacity: 0, duration: 0.6 }, '-=0.3');

      gsap.fromTo(
        '.hv-front',
        { x: 190, y: 130, opacity: 0, rotation: 9 },
        { x: 0, y: 0, opacity: 1, rotation: 5, duration: 1.5, ease: 'power4.out', delay: 0.8 }
      );
      gsap.fromTo(
        '.hv-back',
        { x: 130, y: 80, opacity: 0, rotation: -2 },
        { x: 0, y: 0, opacity: 0.95, rotation: -9, duration: 1.5, ease: 'power4.out', delay: 0.95 }
      );

      // Scroll parallax: the copy drifts up and dims, the image stack sinks and scales.
      gsap.to('.hero-copy', {
        yPercent: -24,
        opacity: 0.22,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero-outer', {
        yPercent: 16,
        scale: 0.92,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      // Mouse-driven 3D tilt on the floating image stack.
      if (window.matchMedia('(pointer: fine)').matches) {
        const tilt = document.querySelector('.hero-tilt');
        gsap.set(tilt, { transformPerspective: 1200 });
        const rX = gsap.quickTo(tilt, 'rotationX', { duration: 0.8, ease: 'power3.out' });
        const rY = gsap.quickTo(tilt, 'rotationY', { duration: 0.8, ease: 'power3.out' });
        const move = (e) => {
          const px = e.clientX / window.innerWidth - 0.5;
          const py = e.clientY / window.innerHeight - 0.5;
          rY(px * 10);
          rX(-py * 8);
        };
        window.addEventListener('mousemove', move, { passive: true });
        overrides.push(() => window.removeEventListener('mousemove', move));
      }
    }, heroRef);

    return () => {
      overrides.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-ember-a" aria-hidden="true" />
      <div className="hero-ember-b" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow hero-kicker">Hidden Leaf Village · Est. 1999 · 720 Episodes of Proof</p>
          <h1 className="hero-title">
            <span className="line">
              <span className="line-inner">The Orphan Who</span>
            </span>
            <span className="line">
              <span className="line-inner">
                Became a<span className="title-pill" style={{ backgroundImage: `url(${HERO_PILL})` }} />
                Legend.
              </span>
            </span>
          </h1>
          <p className="hero-sub">
            No talent. No family. No chance. Naruto Uzumaki still out-stubborned every shadow in the
            Five Great Nations and talked his way into history — one Rasengan at a time.
          </p>
          <div className="hero-cta">
            <a href="#world" className="btn btn-solid" onClick={(e) => go(e, '#world')}>
              Begin the Saga <span className="arr">-&gt;</span>
            </a>
            <a href="#cast" className="btn btn-ghost" onClick={(e) => go(e, '#cast')}>
              Meet the Cast
            </a>
          </div>
        </div>

        <div className="hero-outer">
          <div className="hero-tilt">
            <div className="hv-card hv-back">
              <img src={HERO_BACK} alt="Storm clouds over the shinobi world" loading="eager" />
            </div>
            <div className="hv-card hv-front">
              <img src={HERO_FRONT} alt="The Hidden Leaf at dusk" loading="eager" />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <div className="hs-in">
          <span>SCROLL</span>
          <span className="scroll-line">
            <i />
          </span>
        </div>
      </div>
    </section>
  );
}
