import { personalAwards, clients, vkFilmServices } from '../works-data';
import { DisplayTitle } from '../components/DisplayTitle';

export function Credentials() {
  return (
    <section
      id="credentials"
      className="relative py-32 px-6 lg:px-16 bg-[#0d1112] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        {/* Awards */}
        <div>
          <h2 className="text-h2 lg:text-h1 text-white font-medium mb-12">
            <DisplayTitle text="AWARDS" />
          </h2>
          <ul className="space-y-8">
            {personalAwards.map((a) => (
              <li
                key={a.title}
                className="border-l-2 border-highlight pl-6"
              >
                <p className="text-white/40 text-sm tracking-widest mb-1">
                  {a.year}
                </p>
                <p className="text-white text-xl font-light">{a.title}</p>
                <p className="text-highlight text-lg font-light mt-1">
                  {a.result}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* VK FILM & Clients */}
        <div>
          <h2 className="text-h2 lg:text-h1 text-white font-medium mb-12">
            <DisplayTitle text="VK FILM" />
          </h2>
          <p className="text-white/60 font-light mb-8">
            2017 — 2025 · Director / Videographer / Photographer
          </p>
          <ul className="space-y-4 mb-14">
            {vkFilmServices.map((s) => (
              <li key={s} className="text-white/85 text-lg font-light flex gap-3">
                <span className="text-[#c13a6b]">—</span>
                {s}
              </li>
            ))}
          </ul>
          <p className="text-white/40 text-sm tracking-[0.3em] mb-6">CLIENTS</p>
          <div className="flex flex-wrap gap-3">
            {clients.map((c) => (
              <span
                key={c}
                className="border border-white/15 text-white/70 text-sm tracking-wider px-4 py-2"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
