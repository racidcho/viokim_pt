import { ArrowUpRight } from 'lucide-react';
import { useSlateNavigate } from '../components/Slate';
import { filmography } from '../works-data';

export function Filmography() {
  const playSlate = useSlateNavigate();

  const rowGrid =
    'grid-cols-[3.5rem_minmax(0,1fr)_1rem] md:grid-cols-[4rem_minmax(0,1fr)_7rem_11rem_1rem] xl:grid-cols-[4rem_minmax(0,1.7fr)_6.5rem_5rem_10.5rem_8rem_1rem]';

  return (
    <section
      id="filmography"
      className="relative scroll-mt-20 bg-black px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 flex flex-col gap-6 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-6 font-mono text-[10px] tracking-[0.28em] text-white/40">03 · COMPLETE INDEX</p>
            <h2 className="whitespace-nowrap font-display-serif text-[12vw] leading-[0.8] tracking-[-0.06em] text-white sm:text-[clamp(3.8rem,8vw,8rem)]">
              FILM<span className="italic text-highlight">OGRAPHY</span>
            </h2>
            <p className="mt-6 max-w-xl text-base text-white/50">
              2019 — 2026 · 장편 {filmography.filter((f) => f.type.includes('Feature')).length}
              편 · 단편 {filmography.filter((f) => f.type.includes('Short')).length}
              편 · 다큐멘터리 {filmography.filter((f) => f.type === 'Documentary').length}편
            </p>
          </div>
          <p className="text-white/30 text-sm tracking-widest">
            ↓ 작품을 선택하면 상세 페이지로 이동합니다
          </p>
        </div>

        <div className="border-t border-white/10">
          <div
            aria-hidden="true"
            className={`hidden ${rowGrid} items-center gap-x-4 border-b border-white/15 px-2 py-3 font-mono text-[9px] tracking-[0.2em] text-white/30 md:grid md:gap-x-6`}
          >
            <span>YEAR</span>
            <span className="xl:grid xl:grid-cols-[minmax(9rem,0.72fr)_minmax(0,1fr)] xl:gap-x-6">
              <span>TITLE</span>
              <span className="hidden xl:block">ENGLISH</span>
            </span>
            <span>DIRECTOR</span>
            <span className="hidden xl:block">RUNTIME</span>
            <span>ROLE</span>
            <span className="hidden xl:block">FESTIVAL</span>
            <span />
          </div>

          {filmography.map((f) => {
            const inner = (
              <>
                <span className="self-start pt-1 font-mono text-xs tabular-nums text-white/40 md:self-center md:pt-0 md:text-sm">
                  {f.year}
                </span>
                <span className="min-w-0 md:py-0.5 xl:grid xl:grid-cols-[minmax(9rem,0.72fr)_minmax(0,1fr)] xl:items-baseline xl:gap-x-6">
                  <span className="block truncate text-lg font-light text-white transition-colors group-hover:text-highlight md:text-2xl">
                    {f.titleKo}
                  </span>
                  <span className="mt-1 block truncate text-[11px] tracking-[0.16em] text-white/40 md:text-sm xl:mt-0">
                    {f.titleEn}
                  </span>
                </span>
                <span className="hidden min-w-0 truncate text-sm text-white/40 md:block">
                  {f.director}
                </span>
                <span className="hidden text-sm tabular-nums text-white/40 xl:block">
                  {f.runtime}
                </span>
                <span className="hidden min-w-0 text-sm leading-snug text-white/60 md:block">
                  {f.role}
                </span>
                <span className="hidden min-w-0 truncate text-sm text-highlight/80 xl:block">
                  {f.festival}
                </span>
                <span className="flex h-4 w-4 items-center justify-center" aria-hidden="true">
                  {f.slug && (
                    <ArrowUpRight className="h-4 w-4 text-white/30 transition-colors group-hover:text-highlight" />
                  )}
                </span>
              </>
            );
            const cls =
              `group grid ${rowGrid} w-full items-center gap-x-4 border-b border-white/10 px-2 py-5 transition-colors md:gap-x-6`;
            return f.slug ? (
              <button
                key={f.titleKo}
                onClick={() =>
                  playSlate(`/work/${f.slug}`, {
                    scene: `SCENE ${f.year}`,
                    title: f.titleKo,
                    subtitle: f.titleEn,
                  })
                }
                className={`${cls} cursor-pointer text-left hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-highlight`}
              >
                {inner}
              </button>
            ) : (
              <div key={f.titleKo} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
