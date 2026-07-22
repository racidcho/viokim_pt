import { ArrowUpRight } from 'lucide-react';
import { useSlateNavigate } from '../components/Slate';
import { filmography } from '../works-data';

export function Filmography() {
  const playSlate = useSlateNavigate();
  // 연도별 그룹핑
  const byYear = new Map<string, typeof filmography>();
  filmography.forEach((f) => {
    const list = byYear.get(f.year) ?? [];
    list.push(f);
    byYear.set(f.year, list);
  });

  return (
    <section
      id="filmography"
      className="relative bg-black px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 flex flex-col gap-6 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-6 font-mono text-[10px] tracking-[0.28em] text-white/40">03 · COMPLETE INDEX</p>
            <h2 className="font-display-serif text-[clamp(3.8rem,8vw,8rem)] leading-[0.8] tracking-[-0.06em] text-white">
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
          {filmography.map((f) => {
            const inner = (
              <>
                <span className="text-white/40 text-sm w-14 shrink-0 pt-1">
                  {f.year}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-lg md:text-2xl font-light text-white group-hover:text-highlight transition-colors truncate">
                    {f.titleKo}
                    <span className="ml-3 text-sm md:text-base text-white/40 tracking-widest">
                      {f.titleEn}
                    </span>
                  </span>
                </span>
                <span className="hidden md:block w-32 text-white/40 text-sm">
                  {f.director}
                </span>
                <span className="hidden lg:block w-28 text-white/40 text-sm">
                  {f.runtime}
                </span>
                <span className="hidden md:block w-44 text-white/60 text-sm">
                  {f.role}
                </span>
                <span className="hidden xl:block w-36 text-highlight/80 text-sm">
                  {f.festival}
                </span>
                {f.slug && (
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-highlight shrink-0 transition-colors" />
                )}
              </>
            );
            const cls =
              'group flex items-center gap-4 md:gap-6 py-5 border-b border-white/10 transition-colors hover:bg-white/[0.03] px-2 -mx-2';
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
              className={`${cls} w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-highlight`}
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
