import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SEEDED = (seed) => `https://picsum.photos/seed/${seed}/1400/900`;

const ARCS = [
  {
    eyebrow: 'Origin',
    title: 'The Orphan\u2019s Dream',
    text: 'A prank-painting academy student pledges the impossible: become Hokage, so the village that ignored him finally sees his face.',
    seed: 'training-field',
  },
  {
    eyebrow: 'Tournament',
    title: 'The Chunin Exams',
    text: 'One tournament detonates the entire roster — a cursed seal, a Forest of Death, and a rivalry that will outlive the exams.',
    seed: 'taijutsu-arena',
  },
  {
    eyebrow: 'Betrayal',
    title: 'The Defection',
    text: 'Toward the snake in the dark. At the Valley of the End, two headbands and one bond get torn in half.',
    seed: 'waterfall-valley',
  },
  {
    eyebrow: 'The Hunt',
    title: 'Akatsuki Rising',
    text: 'The red clouds move village to village, extracting beasts. Naruto trains in sage arts while his shadow runs out of time.',
    seed: 'rain-watchtower',
  },
  {
    eyebrow: 'War',
    title: 'The Fourth Great War',
    text: 'Ten thousand shinobi versus an undead army and a goddess. One question decides the planet: can willpower truly end hatred?',
    seed: 'battlefield-ash',
  },
  {
    eyebrow: 'Promise Kept',
    title: 'The Seventh Hokage',
    text: 'The dead last takes the summit of the stone faces. A scarred village cheers the boy it once looked past.',
    seed: 'monument-faces',
  },
];

export default function Saga() {
  const sagaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.saga-head', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.saga-head', start: 'top 86%' },
      });

      const cards = gsap.utils.toArray('.saga-card');
      cards.forEach((c, i) => gsap.set(c, { zIndex: i + 1, transformPerspective: 1200 }));
      gsap.set(cards.slice(1), { yPercent: 135 });

      const tl = gsap.timeline({
        defaults: { ease: 'power1.out' },
        scrollTrigger: {
          trigger: '.saga-stage',
          start: 'top top',
          end: '+=340%',
          scrub: 0.8,
          pin: true,
          onUpdate: (self) => gsap.set('.saga-progress i', { scaleX: self.progress }),
        },
      });

      tl.from(cards[0], { y: 80, opacity: 0, duration: 0.35, ease: 'power2.out' });

      for (let i = 1; i < cards.length; i++) {
        tl.fromTo(
          cards[i],
          { yPercent: 135, rotateX: -16, scale: 0.9 },
          { yPercent: 0, rotateX: 0, scale: 1, duration: 1 },
          i === 1 ? '>-0.05' : '>-0.1'
        )
          .to(
            cards.slice(0, i),
            {
              scale: (idx) => 1 - 0.07 * (i - idx),
              yPercent: (idx) => -5 * (i - idx),
              duration: 1,
              ease: 'power1.in',
            },
            '<'
          )
          .to(
            cards.slice(0, i).map((el) => el.querySelector('.sc-veil')),
            { opacity: (idx) => Math.min(0.7, 0.14 * (i - idx)), duration: 1, ease: 'none' },
            '<'
          );
      }
    }, sagaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="saga section-pad" id="saga" ref={sagaRef}>
      <div className="container section-head saga-head">
        <div className="stack" data-reveal>
          <p className="eyebrow">The Chronicle</p>
          <h2 className="h2">
            The Journey,<br />
            Arc by <em>Arc.</em>
          </h2>
        </div>
        <p className="section-sub">
          Scroll to stack the volumes of the ride — from academy failure to the seat of the Hokage.
        </p>
      </div>

      <div className="saga-stage">
        {ARCS.map((a) => (
          <article className="saga-card" key={a.title} data-hover>
            <div className="sc-veil" aria-hidden="true" />
            <div className="sc-media" style={{ backgroundImage: `url(${SEEDED(a.seed)})` }}>
              <span className="sc-eyebrow">{a.eyebrow}</span>
            </div>
            <div className="sc-body">
              <h3 className="sc-title">{a.title}</h3>
              <p className="sc-text">{a.text}</p>
            </div>
          </article>
        ))}
        <div className="saga-progress" aria-hidden="true">
          <i />
        </div>
      </div>
    </section>
  );
}
