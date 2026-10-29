import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LORE =
  'Every generation inherits the same wound and the same question — pass on the cycle of hatred, or be the one who breaks it. An orphan with more chakra than sense chose open arms over closed fists, and dragged an entire world toward a brighter answer.';

const HOT = new Set(['wound', 'hatred', 'breaks', 'open', 'arms', 'brighter']);

export default function Lore() {
  const loreRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: loreRef.current,
          start: 'top top',
          end: '+=170%',
          scrub: 0.5,
          pin: true,
        },
      });

      tl.fromTo(
        '.lore-word',
        { opacity: 0.12 },
        { opacity: 1, stagger: 0.06 }
      ).from('.lore-sig', { opacity: 0, y: 18 }, '>-0.15');
    }, loreRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="lore" id="lore" ref={loreRef}>
      <div className="lore-pin container-wide">
        <p className="lore-text">
          {LORE.split(' ').map((w, i) => {
            const key = w.replace(/[^a-zA-Z]/g, '').toLowerCase();
            return (
              <span className={`lore-word${HOT.has(key) ? ' hot' : ''}`} key={`${key}-${i}`}>
                {w}{' '}
              </span>
            );
          })}
        </p>
        <p className="lore-sig">— Doctrine of the Will of Fire, lit from the Third.</p>
      </div>
    </section>
  );
}
