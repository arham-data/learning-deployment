import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrollToId } from '../lib/scroll';

const NAV = [
  ['The World', '#world'],
  ['The Lore', '#lore'],
  ['The Cast', '#cast'],
  ['The Saga', '#saga'],
];

const UNIVERSE = ['Manga', 'Films', 'Novels', 'Games'];

export default function Footer() {
  const footRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.footer', start: 'top 78%' },
      });
      tl.from('.foot-kick', { y: 20, opacity: 0, duration: 0.6 })
        .from('.foot-title', { y: 70, opacity: 0, duration: 1 }, '-=0.3')
        .from('.foot-sub', { y: 24, opacity: 0, duration: 0.7 }, '-=0.55')
        .from('.foot-cta .btn', { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('.foot-mark', { yPercent: 42, opacity: 0, duration: 1.2, ease: 'power4.out' }, '-=0.6');
    }, footRef);
    return () => ctx.revert();
  }, []);

  const go = (e, target) => {
    e.preventDefault();
    scrollToId(target);
  };

  return (
    <footer className="footer" id="finale" ref={footRef}>
      <div className="footer-cta container-wide">
        <p className="eyebrow foot-kick">Dattebayo — Enough Reading</p>
        <h2 className="foot-title">
          Believe <em>It.</em>
        </h2>
        <p className="foot-sub">
          Start at episode one. End at the stone faces. Bring tissues.
        </p>
        <div className="foot-cta">
          <a href="#top" className="btn btn-solid btn-xl" onClick={(e) => go(e, '#top')}>
            Start the Series <span className="arr">-&gt;</span>
          </a>
        </div>
      </div>

      <div className="foot-grid container">
        <div className="foot-col">
          <p className="foot-label">Explore</p>
          {NAV.map(([label, target]) => (
            <a key={label} href={target} className="foot-link" onClick={(e) => go(e, target)}>
              {label}
            </a>
          ))}
        </div>
        <div className="foot-col">
          <p className="foot-label">The Universe</p>
          {UNIVERSE.map((label) => (
            <span key={label} className="foot-link foot-static">
              {label}
            </span>
          ))}
        </div>
        <div className="foot-col">
          <p className="foot-label">This Site</p>
          <span className="foot-link foot-static">Built with React, CSS, GSAP and Lenis</span>
          <span className="foot-link foot-static">Custom pointer, 3D scroll, zero mercy</span>
        </div>
      </div>

      <p className="foot-mark" aria-hidden="true">
        NARUTO
      </p>
      <p className="foot-legal container">
        Unofficial fan showcase made for love of the series. Naruto &copy; Masashi Kishimoto ·
        Shueisha · Studio Pierrot · TV Tokyo.
      </p>
    </footer>
  );
}
