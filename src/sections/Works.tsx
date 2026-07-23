import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSlateNavigate } from '../components/Slate';
import { featuredWorks, type Work, type WorkCategory } from '../works-data';

type Filter = 'all' | WorkCategory;

const filters: Array<{ value: Filter; label: string }> = [
  { value: 'all', label: 'ALL' },
  { value: 'feature', label: 'FEATURE' },
  { value: 'short', label: 'SHORT' },
  { value: 'documentary', label: 'DOCUMENTARY' },
];

function workAspect(work: Work) {
  const match = work.format.match(/(\d+(?:\.\d+)?):1/);
  return match ? `${match[1]} / 1` : '16 / 9';
}

export function Works() {
  const playSlate = useSlateNavigate();
  const [filter, setFilter] = useState<Filter>('all');
  const filtered = useMemo(
    () => featuredWorks.filter((work) => filter === 'all' || work.category === filter),
    [filter]
  );
  const [activeSlug, setActiveSlug] = useState(featuredWorks[0].slug);

  const activeWork =
    filtered.find((work) => work.slug === activeSlug) ?? filtered[0] ?? featuredWorks[0];

  const openWork = (work: Work) => {
    const index = featuredWorks.findIndex((item) => item.slug === work.slug);
    playSlate(`/work/${work.slug}`, {
      scene: `SCENE ${String(index + 1).padStart(2, '0')}`,
      title: work.titleKo,
      subtitle: `${work.titleEn} · ${work.year}`,
    });
  };

  return (
    <section id="works" className="bg-black px-5 py-24 text-white sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 border-t border-white/20 pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-6 font-mono text-[10px] tracking-[0.28em] text-white/40">
              02 · SELECTED WORKS
            </p>
            <h2 className="english-display text-[clamp(4.8rem,11vw,10rem)] leading-[0.78] tracking-[-0.075em]">
              WORKS
            </h2>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3" aria-label="작품 필터">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  setFilter(item.value);
                  const nextActive = featuredWorks.find(
                    (work) => item.value === 'all' || work.category === item.value
                  );
                  if (nextActive) setActiveSlug(nextActive.slug);
                }}
                className={`border-b pb-1 font-mono text-[10px] tracking-[0.2em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight ${
                  filter === item.value
                    ? 'border-highlight text-highlight'
                    : 'border-transparent text-white/40 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden grid-cols-[0.9fr_1.25fr] gap-10 lg:grid">
          <div className="border-t border-white/15">
            {filtered.map((work, index) => {
              const active = work.slug === activeWork.slug;
              return (
                <button
                  key={work.slug}
                  type="button"
                  onMouseEnter={() => setActiveSlug(work.slug)}
                  onFocus={() => setActiveSlug(work.slug)}
                  onClick={() => openWork(work)}
                  className={`group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-white/15 py-6 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-highlight ${
                    active ? 'bg-[#ecebe6] px-5 text-black' : 'text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span className={`font-mono text-[10px] tracking-[0.18em] ${active ? 'text-black/45' : 'text-white/35'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block text-2xl font-medium tracking-[-0.04em]">{work.titleKo}</span>
                    <span className={`mt-1 block font-mono text-[10px] tracking-[0.16em] ${active ? 'text-black/50' : 'text-white/35'}`}>
                      {work.titleEn} · {work.year} · {work.categoryLabel}
                    </span>
                  </span>
                  <ArrowUpRight className={`h-4 w-4 ${active ? 'text-black' : 'text-white/30 group-hover:text-highlight'}`} />
                </button>
              );
            })}
          </div>

          <div className="sticky top-28 self-start">
            <button
              key={activeWork.slug}
              type="button"
              onClick={() => openWork(activeWork)}
              data-cursor
              className="cut-in group relative block w-full overflow-hidden bg-[#0b0f10] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
              style={{ aspectRatio: workAspect(activeWork) }}
              aria-label={`${activeWork.titleKo} 상세 보기`}
            >
              <img
                src={activeWork.stills[0]}
                alt={`${activeWork.titleKo} 대표 스틸`}
                className="h-full w-full object-contain transition-transform group-hover:scale-[1.025]"
                style={{ transitionDuration: '6000ms' }}
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-black/70 px-5 py-4 backdrop-blur-sm">
                <span>
                  <span className="block text-xl font-medium">{activeWork.titleKo}</span>
                  <span className="mt-1 block font-mono text-[9px] tracking-[0.18em] text-white/55">
                    DIR. {activeWork.director} · {activeWork.format}
                  </span>
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-highlight">VIEW FRAME ↗</span>
              </span>
            </button>
          </div>
        </div>

        <div className="space-y-12 lg:hidden">
          {filtered.map((work, index) => (
            <button
              key={work.slug}
              type="button"
              onClick={() => openWork(work)}
              className="block w-full border-t border-white/20 pt-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
            >
              <span className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-white/45">
                <span>{String(index + 1).padStart(2, '0')} · {work.categoryLabel.toUpperCase()}</span>
                <span>{work.year}</span>
              </span>
              <img
                src={work.stills[0]}
                alt={`${work.titleKo} 대표 스틸`}
                className="h-auto w-full bg-[#0b0f10] object-contain"
                loading={index < 2 ? 'eager' : 'lazy'}
              />
              <span className="mt-4 flex items-end justify-between gap-5">
                <span>
                  <span className="block text-3xl font-medium tracking-[-0.045em]">{work.titleKo}</span>
                  <span className="mt-1 block font-mono text-[9px] tracking-[0.16em] text-white/40">{work.titleEn} · {work.format}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-highlight" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
