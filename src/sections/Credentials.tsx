import { personalAwards, clients, vkFilmServices } from '../works-data';

export function Credentials() {
  return (
    <section
      id="credentials"
      className="relative bg-[#ecebe6] px-5 py-24 text-black sm:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 border-t border-black/20 pt-6 font-mono text-[10px] tracking-[0.28em] text-black/45">04 · CREDENTIALS</p>
        <div className="grid gap-20 lg:grid-cols-2">
        {/* Awards */}
        <div>
          <h2 className="mb-12 font-display-serif text-[clamp(3.8rem,7vw,7rem)] leading-[0.8] tracking-[-0.06em]">
            AW<span className="italic text-highlight">ARDS</span>
          </h2>
          <ul className="space-y-8">
            {personalAwards.map((a) => (
              <li
                key={a.title}
                className="border-l-2 border-highlight pl-6"
              >
                <p className="mb-1 text-sm tracking-widest text-black/40">
                  {a.year}
                </p>
                <p className="text-xl font-light text-black">{a.title}</p>
                <p className="text-highlight text-lg font-light mt-1">
                  {a.result}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* VK FILM & Clients */}
        <div>
          <h2 className="mb-12 font-display-serif text-[clamp(3.8rem,7vw,7rem)] leading-[0.8] tracking-[-0.06em]">
            VK <span className="italic text-highlight">FILM</span>
          </h2>
          <p className="mb-8 font-light text-black/55">
            2017 — 2025 · Director / Videographer / Photographer
          </p>
          <ul className="space-y-4 mb-14">
            {vkFilmServices.map((s) => (
              <li key={s} className="flex gap-3 text-lg font-light text-black/80">
                <span className="text-highlight">—</span>
                {s}
              </li>
            ))}
          </ul>
          <p className="mb-6 text-sm tracking-[0.3em] text-black/40">CLIENTS</p>
          <div className="flex flex-wrap gap-3">
            {clients.map((c) => (
              <span
                key={c}
                className="border border-black/15 px-4 py-2 text-sm tracking-wider text-black/65"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
