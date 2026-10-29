import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrollToId } from '../lib/scroll';

const LINKS = [
  ['World', '#world'],
  ['Lore', '#lore'],
  ['Cast', '#cast'],
  ['Saga', '#saga'],
];

const go = (e, target) => {
  e.preventDefault();
  scrollToId(target);
};

export default function Nav() {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-pill', {
        y: -34,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5,
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <header className="header" ref={navRef}>
      <nav className="nav-pill" aria-label="Primary">
        <a href="#top" className="nav-logo" onClick={(e) => go(e, '#top')}>
          <span className="mark">
            <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <path
                d="M33 10c12 1 21 10 21 22 0 11-8 20-19 20-9 0-16-6-16-14 0-7 5-12 12-12 6 0 10 4 10 9 0 4-3 7-7 7"
                stroke="#140b06"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          SHOWCASE
        </a>
        <div className="nav-links">
          {LINKS.map(([label, target]) => (
            <a key={label} href={target} className="nav-link" onClick={(e) => go(e, target)}>
              {label}
            </a>
          ))}
        </div>
        <a href="#finale" className="btn btn-ember nav-cta" onClick={(e) => go(e, '#finale')}>
          Watch Now
        </a>
      </nav>
    </header>
  );
}
