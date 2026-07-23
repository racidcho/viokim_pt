import { aboutConfig } from '../config';

const facts = [
  ['17+', 'FILMS'],
  ['2020—26', 'CINEMATOGRAPHY'],
  ['SEOUL', 'BASED'],
];

export function About() {
  return (
    <section id="about" className="bg-[#ecebe6] px-5 pb-24 text-black sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div className="-mx-5 sm:-mx-8 lg:mx-0">
          <div className="relative h-[86svh] min-h-[640px] max-h-[760px] overflow-hidden bg-black text-white lg:hidden">
            <img
              src={aboutConfig.image2}
              alt=""
              className="absolute inset-0 h-full w-full scale-[1.03] object-cover object-center opacity-70"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.08)_42%,rgba(0,0,0,0.92)_100%)]" aria-hidden="true" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.62)_0%,transparent_52%,rgba(0,0,0,0.16)_100%)]" aria-hidden="true" />

            <div className="absolute inset-x-5 top-8 z-20 flex items-center justify-between border-t border-white/30 pt-3 font-mono text-[8px] tracking-[0.22em] text-white/65">
              <span>01 · PORTRAIT IN FRAME</span>
              <span className="text-highlight">SEOUL · KR</span>
            </div>

            <div className="absolute left-5 top-[30%] z-20 font-mono text-[8px] tracking-[0.2em] text-white/[0.55]" aria-hidden="true">
              <p className="text-3xl font-semibold tracking-[-0.06em] text-white">17+</p>
              <p className="mt-1">FILMS</p>
              <p className="mt-8 text-white">2020—26</p>
              <p className="mt-1">CINEMATOGRAPHY</p>
            </div>

            <figure className="absolute right-5 top-[14%] z-10 w-[58%] max-w-[250px] border border-white/25 bg-black shadow-[0_28px_80px_rgba(0,0,0,0.5)]">
              <img
                src={aboutConfig.image1}
                alt={aboutConfig.image1Alt}
                className="aspect-[500/643] w-full object-cover object-top grayscale"
                loading="lazy"
              />
              <figcaption className="flex items-center justify-between border-t border-white/20 bg-black px-3 py-3 font-mono text-[7px] tracking-[0.17em] text-white/[0.58]">
                <span>VIO KIM</span>
                <span>PORTRAIT · 01</span>
              </figcaption>
            </figure>

            <div className="absolute inset-x-5 bottom-7 z-20">
              <p className="font-mono text-[8px] tracking-[0.24em] text-highlight">DIRECTOR OF PHOTOGRAPHY</p>
              <p className="mt-3 whitespace-nowrap text-[20vw] font-bold leading-[0.78] tracking-[-0.09em]">
                VIO <span className="english-display font-bold text-white/70">KIM</span>
              </p>
              <div className="mt-5 flex items-end justify-between gap-5 border-t border-white/25 pt-4">
                <p className="max-w-[15rem] text-[13px] leading-relaxed text-white/[0.68]">
                  빛과 어둠 사이, 프레임 안의 이야기.
                </p>
                <p className="shrink-0 font-mono text-[7px] tracking-[0.18em] text-white/[0.45]">SELECTED FRAME · 02</p>
              </div>
            </div>
          </div>

          <div className="relative hidden min-h-[720px] overflow-hidden bg-black lg:block">
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
        </div>

        <div className="flex flex-col justify-between border-t border-black/20 pb-0 pt-16 lg:py-4">
          <div>
            <p className="mb-12 font-mono text-[10px] tracking-[0.28em] text-black/45">
              01 · MANIFESTO
            </p>
            <h2 className="text-balance font-korean-display text-[clamp(3.4rem,7vw,7.2rem)] leading-[0.96] tracking-[-0.055em]">
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
