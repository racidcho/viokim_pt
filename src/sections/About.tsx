import { aboutConfig } from '../config';

const facts = [
  ['17+', 'FILMS'],
  ['2020—26', 'CINEMATOGRAPHY'],
  ['SEOUL', 'BASED'],
];

export function About() {
  return (
    <section id="about" className="bg-[#ecebe6] px-5 py-24 text-black sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div className="relative min-h-[520px] overflow-hidden bg-black lg:min-h-[720px]">
          <img
            src={aboutConfig.image1}
            alt={aboutConfig.image1Alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/75 px-5 py-4 font-mono text-[10px] tracking-[0.18em] text-white/65 backdrop-blur-sm">
            <span>PORTRAIT · VIO KIM</span>
            <span>SEOUL, KR</span>
          </div>
        </div>

        <div className="flex flex-col justify-between border-t border-black/20 pt-6 lg:py-4">
          <div>
            <p className="mb-12 font-mono text-[10px] tracking-[0.28em] text-black/45">
              01 · MANIFESTO
            </p>
            <h2 className="text-balance font-display-serif text-[clamp(3.4rem,7vw,7.2rem)] leading-[0.96] tracking-[-0.055em]">
              {aboutConfig.titleLine1}
              <br />
              <span className="italic">{aboutConfig.titleLine2}</span>
            </h2>
            <div className="mt-12 h-1 w-20 bg-highlight" aria-hidden="true" />
            <p className="mt-10 max-w-2xl text-lg leading-[1.85] text-black/65 sm:text-xl">
              {aboutConfig.description}
            </p>
          </div>

          <dl className="mt-16 grid grid-cols-3 border-y border-black/15">
            {facts.map(([value, label]) => (
              <div key={label} className="border-r border-black/15 px-3 py-5 last:border-r-0 sm:px-5">
                <dt className="text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">{value}</dt>
                <dd className="mt-2 font-mono text-[9px] tracking-[0.17em] text-black/45 sm:text-[10px]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
