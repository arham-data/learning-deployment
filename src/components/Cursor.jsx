import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HOVER_SELECTOR = 'a, button, [data-hover]';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -200, y: -200 });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.07, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.07, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    const move = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const enter = (e) => {
      if (e.target.closest(HOVER_SELECTOR)) {
        dot.classList.add('is-active');
        ring.classList.add('is-active');
      }
    };

    const leave = (e) => {
      if (e.target.closest(HOVER_SELECTOR)) {
        dot.classList.remove('is-active');
        ring.classList.remove('is-active');
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', enter);
    document.addEventListener('mouseout', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', enter);
      document.removeEventListener('mouseout', leave);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring">
        <i />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
