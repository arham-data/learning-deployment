const VILLAGES = [
  'Konohagakure',
  'Sunagakure',
  'Kirigakure',
  'Iwagakure',
  'Kumogakure',
  'Amegakure',
];

const Row = () => (
  <div className="marquee-row">
    {VILLAGES.map((v) => (
      <span className="marquee-item" key={v}>
        {v}
        <i className="mq-diamond" aria-hidden="true" />
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee-band">
        <div className="marquee-track">
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}
