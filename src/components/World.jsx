import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const KONOHA = 'https://picsum.photos/seed/hidden-leaf/1000/1100';
const AKATSUKI = 'https://picsum.photos/seed/crimson-cloud/700/700';
const SHARINGAN = 'https://picsum.photos/seed/blood-moon/900/700';

const CARDS = {
  akatsuki: { over: 'Rogue Registry', title: 'The Red Clouds', copy: 'Ten S-rank missing-nin hunting tailed beasts, dressed as a fashion warning.' },
  jutsu: { over: 'Signature Technique', title: 'Rasengan', copy: 'Malformed in the morning. Mastered by dinner.' },
  sharingan: { over: 'Dojutsu Archive', title: 'Sharingan', copy: 'The eye that copies everything — except loss.' },
  sannin: { over: 'The Legendary Sannin', title: 'Toad. Slug. Snake.', copy: 'The trio who named an era before their paths split forever.' },
};

export default function World() {
  const worldRef = useRef(null);

  useEffect(() => {
    const overrides = [];

    const ctx = gsap.context(() => {
      // Entrance: cards rise from below with a slight 3D rotation.
      gsap.from('.bento .cell', {
        y: 90,
        opacity: 0,
        scale: 0.96,
        rotateX: -6,
        stagger: 0.09,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.bento', start: 'top 80%', once: true },
      });

      // Per-card 3D tilt on hover.
      if (window.matchMedia('(pointer: fine)').matches) {
        worldRef.current.querySelectorAll('.cell').forEach((el) => {
          gsap.set(el, { transformPerspective: 900 });
          const rx = gsap.quickTo(el, 'rotationX', { duration: 0.55, ease: 'power2.out' });
          const ry = gsap.quickTo(el, 'rotationY', { duration: 0.55, ease: 'power2.out' });
          const move = (e) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            ry(px * 9);
            rx(-py * 7);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          el.addEventListener('mousemove', move, { passive: true });
          el.addEventListener('mouseleave', leave);
          overrides.push(() => {
            el.removeEventListener('mousemove', move);
            el.removeEventListener('mouseleave', leave);
          });
        });
      }
    }, worldRef);

    return () => {
      overrides.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section className="world section-pad" id="world" ref={worldRef}>
      <div className="container section-head">
        <div className="stack" data-reveal>
          <p className="eyebrow">The Known World</p>
          <h2 className="h2">
            One World.<br />
            Five Great <em>Nations.</em>
          </h2>
        </div>
        <p className="section-sub">
          A battlefield map of the shinobi world — how each village feeds the story, and why the red
          clouds still haunt it.
        </p>
      </div>

      <div className="container-wide">
        <div className="bento">
          <article className="cell cell-a" data-hover>
            <img className="cell-img" src={KONOHA} alt="Konohagakure, the Hidden Leaf" loading="lazy" />
            <div className="cell-veil" aria-hidden="true" />
            <div className="cell-body">
              <span className="cell-over">Hidden Leaf Village</span>
              <h3 className="cell-title">Konohagakure</h3>
              <p className="cell-copy">
                Home of the Will of Fire — where every generation plants a stronger tree than the
                last.
              </p>
            </div>
          </article>

          <article className="cell cell-b cell-akatsuki" data-hover>
            <img className="cell-img" src={AKATSUKI} alt="The crimson clouds of Akatsuki" loading="lazy" />
            <div className="cell-veil" aria-hidden="true" />
            <div className="cell-body">
              <span className="cell-over">{CARDS.akatsuki.over}</span>
              <h3 className="cell-title">{CARDS.akatsuki.title}</h3>
              <p className="cell-copy">{CARDS.akatsuki.copy}</p>
            </div>
          </article>

          <article className="cell cell-c cell-jutsu" data-hover>
            <div className="rasengan" aria-hidden="true">
              <i />
            </div>
            <div className="cell-body">
              <span className="cell-over">{CARDS.jutsu.over}</span>
              <h3 className="cell-title">{CARDS.jutsu.title}</h3>
              <p className="cell-copy">{CARDS.jutsu.copy}</p>
            </div>
          </article>

          <article className="cell cell-d" data-hover>
            <img className="cell-img" src={SHARINGAN} alt="A blood moon, like the Sharingan" loading="lazy" />
            <div className="cell-veil" aria-hidden="true" />
            <div className="cell-body">
              <span className="cell-over">{CARDS.sharingan.over}</span>
              <h3 className="cell-title">{CARDS.sharingan.title}</h3>
              <p className="cell-copy">{CARDS.sharingan.copy}</p>
            </div>
          </article>

          <article className="cell cell-e cell-sannin" data-hover>
            <div className="sannin-type" aria-hidden="true">
              <span>Toad.</span>
              <span>Slug.</span>
              <span>Snake.</span>
            </div>
            <div className="cell-veil" aria-hidden="true" />
            <div className="cell-body">
              <span className="cell-over">{CARDS.sannin.over}</span>
              <h3 className="cell-title">{CARDS.sannin.title}</h3>
              <p className="cell-copy">{CARDS.sannin.copy}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
