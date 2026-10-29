import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const IMG = {
  naruto: 'https://picsum.photos/seed/sunrise-ninja/900/1100',
  sasuke: 'https://picsum.photos/seed/storm-ninja/900/1100',
  kakashi: 'https://picsum.photos/seed/mist-ninja/900/1100',
  itachi: 'https://picsum.photos/seed/crow-ninja/900/1100',
  jiraiya: 'https://picsum.photos/seed/mountain-ninja/900/1100',
};

const CAST = [
  {
    name: 'Naruto Uzumaki',
    role: 'The Number One Unpredictable Ninja',
    line: 'Started as the dead last. Ended as the reason seven great armies laid down their blades.',
    img: IMG.naruto,
  },
  {
    name: 'Sasuke Uchiha',
    role: 'The Last Avenger',
    line: 'Chased power into the dark for a whole saga before friendship tracked him down.',
    img: IMG.sasuke,
  },
  {
    name: 'Kakashi Hatake',
    role: 'The Copy Ninja',
    line: 'A thousand jutsu memorized and exactly one rule never broken: teammates above missions.',
    img: IMG.kakashi,
  },
  {
    name: 'Itachi Uchiha',
    role: 'The Shadow Patriot',
    line: 'Carried a massacre and a brother\u2019s hatred so a village could stay standing.',
    img: IMG.itachi,
  },
  {
    name: 'Jiraiya',
    role: 'The Toad Sage',
    line: 'Wrote three novels, failed one love, and left his final answer in a code.',
    img: IMG.jiraiya,
  },
];

export default function Cast() {
  const castRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.acc-slice', {
        y: 110,
        opacity: 0,
        rotate: 2,
        stagger: 0.08,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.acc', start: 'top 82%', once: true },
      });
    }, castRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="cast section-pad" id="cast" ref={castRef}>
      <div className="container section-head">
        <div className="stack" data-reveal>
          <p className="eyebrow">Faces of the Franchise</p>
          <h2 className="h2">
            The Ones Who<br />
            Carried <em>the Story.</em>
          </h2>
        </div>
        <p className="section-sub">
          Five figures whose choices broke and rebuilt the shinobi world. Hover — or tap — to unmask
          the details.
        </p>
      </div>

      <div className="container-wide">
        <div className="acc">
          {CAST.map((c, i) => (
            <article
              key={c.name}
              className={`acc-slice${active === i ? ' is-active' : ''}`}
              style={{ backgroundImage: `url(${c.img})` }}
              data-hover
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActive(i);
              }}
              aria-expanded={active === i}
            >
              <span className="acc-tint" aria-hidden="true" />
              <span className="acc-name">{c.name}</span>
              <div className="acc-open">
                <p className="acc-role">{c.role}</p>
                <p className="acc-line">{c.line}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
