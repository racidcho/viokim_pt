import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { navigationConfig } from '../config';
import { useSlateNavigate } from '../components/Slate';
import { works } from '../works-data';

const heroWork = works[0];
const frameCount = heroWork.stills.length;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function Hero() {
  const playSlate = useSlateNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewport, setViewport] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  useEffect(() => {
    heroWork.stills.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    const update = () => {
      rafRef.current = null;
      const section = sectionRef.current;
      if (!section) return;
      const maxScroll = section.offsetHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? clamp(-section.getBoundingClientRect().top / maxScroll) : 0);
    };

    const requestUpdate = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
      requestUpdate();
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const desktop = viewport.width >= 1024;
  const expansion = desktop ? clamp((scrollProgress - 0.22) / 0.7) : 0;
  const identityFade = desktop ? 1 - clamp((scrollProgress - 0.62) / 0.18) : 1;
  const manifestoReveal = desktop ? clamp((scrollProgress - 0.69) / 0.2) : 0;

  const panelStyle = useMemo(() => {
    if (!desktop) return undefined;
    const baseWidth = Math.min(1080, viewport.width * 0.72);
    const baseHeight = viewport.height * 0.77;
    return {
      left: `${viewport.width * 0.028 * (1 - expansion)}px`,
      top: `${viewport.height * 0.13 * (1 - expansion)}px`,
      width: `${baseWidth + (viewport.width - baseWidth) * expansion}px`,
      height: `${baseHeight + (viewport.height - baseHeight) * expansion}px`,
    };
  }, [desktop, expansion, viewport]);

  const selectFrameFromPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (!desktop || event.pointerType === 'touch' || scrollProgress > 0.64) return;
    const next = Math.min(
      frameCount - 1,
      Math.floor(clamp(event.clientX / viewport.width) * frameCount)
    );
    setActiveFrame(next);
  };

  const openWork = () => {
    playSlate(`/work/${heroWork.slug}`, {
      scene: 'SCENE 01',
      title: heroWork.titleKo,
      subtitle: `${heroWork.titleEn} · ${heroWork.year}`,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[100svh] bg-black lg:h-[175svh]"
      onPointerMove={selectFrameFromPointer}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-black">
        <div className="absolute inset-0" data-cursor data-cursor-text="SCRUB">
          <img
            key={heroWork.stills[activeFrame]}
            src={heroWork.stills[activeFrame]}
            alt={`${heroWork.titleKo} 스틸 ${activeFrame + 1}`}
            className="cut-in h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

        <div
          className="panel-enter absolute inset-x-4 top-[8svh] z-10 flex h-[84svh] flex-col overflow-hidden bg-[#ecebe6] text-black shadow-[0_30px_90px_rgba(0,0,0,0.42)] transition-[width,height,left,top] duration-300 sm:inset-x-8 lg:inset-x-auto lg:transition-none"
          style={panelStyle}
        >
          <header className="relative z-20 flex min-h-16 items-center justify-between gap-5 border-b border-black/15 px-5 sm:px-8">
            <a
              href="#hero"
              className="text-sm font-semibold tracking-[-0.03em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
            >
              VIO KIM
            </a>
            <nav aria-label="주요 메뉴" className="hidden items-center gap-7 md:flex">
              {navigationConfig.items
                .filter((item) => item.label !== 'AWARDS')
                .map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-[11px] font-medium tracking-[0.14em] text-black/65 transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
                  >
                    {item.label}
                  </a>
                ))}
            </nav>
            <span className="font-mono text-[9px] tracking-[0.22em] text-black/45 md:hidden">
              DOP · SEOUL
            </span>
          </header>

          <div
            className="relative flex min-h-0 flex-1 flex-col"
            style={{ opacity: identityFade, transform: `translateY(${-18 * (1 - identityFade)}px)` }}
          >
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-5 pb-5 pt-8 text-center sm:px-8">
              <p className="mb-5 font-mono text-[9px] tracking-[0.36em] text-black/50 sm:text-[11px]">
                DIRECTOR OF PHOTOGRAPHY · SEOUL
              </p>
              <h1 className="flex max-w-full items-center justify-center whitespace-nowrap text-[18vw] font-bold leading-[0.82] tracking-[-0.09em] sm:text-[14vw] lg:text-[clamp(8rem,12vw,11.5rem)]">
                <span>VIO</span>
                <span className="ml-[0.08em] bg-highlight px-[0.1em] pb-[0.08em] text-black">
                  KIM
                </span>
              </h1>
              <p className="mt-7 text-balance text-sm font-medium leading-relaxed text-black/60 sm:text-lg">
                빛과 어둠 사이, 프레임 안의 이야기.
              </p>
            </div>

            <div className="border-t border-black/15 px-4 pb-4 pt-3 sm:px-6 sm:pb-5">
              <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[8px] tracking-[0.2em] text-black/45 sm:text-[9px]">
                <span className="text-highlight">→ MOVE TO SCRUB FRAMES</span>
                <span>{heroWork.titleKo} · {heroWork.titleEn}</span>
              </div>
              <div className="hide-scrollbar grid auto-cols-[7.5rem] grid-flow-col gap-2 overflow-x-auto sm:auto-cols-fr sm:grid-cols-6 sm:overflow-visible">
                {heroWork.stills.map((still, index) => {
                  const active = index === activeFrame;
                  return (
                    <button
                      key={still}
                      type="button"
                      onClick={() => setActiveFrame(index)}
                      onFocus={() => setActiveFrame(index)}
                      className={`group border-t-2 pt-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight ${
                        active ? 'border-highlight text-highlight' : 'border-transparent text-black/45 hover:border-black/30 hover:text-black'
                      }`}
                      aria-pressed={active}
                      aria-label={`${heroWork.titleKo} 컷 ${index + 1} 보기`}
                    >
                      <span className="mb-2 block text-center font-mono text-[8px] tracking-[0.18em] sm:text-[9px]">
                        CUT {String(index + 1).padStart(2, '0')}
                      </span>
                      <img
                        src={still}
                        alt=""
                        className={`aspect-[2.39/1] w-full object-cover transition-opacity ${active ? 'opacity-100' : 'opacity-55 group-hover:opacity-90'}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-10 hidden bg-[#ecebe6] px-8 pb-10 pt-28 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
            style={{ opacity: manifestoReveal }}
            aria-hidden={manifestoReveal < 0.5}
          >
            <div className="flex flex-col justify-end pb-4">
              <p className="max-w-xs text-base leading-relaxed text-black/55">
                장면의 감정을 먼저 읽고, 빛과 움직임으로 오래 남는 프레임을 만듭니다.
              </p>
              <p className="mt-10 font-mono text-[9px] tracking-[0.24em] text-highlight">
                01 / 03 · IDENTITY TO MANIFESTO
              </p>
            </div>
            <p className="self-center text-[clamp(3.5rem,5.6vw,6.4rem)] font-semibold leading-[1.05] tracking-[-0.065em]">
              보이지 않는 것을
              <br />
              <span className="inline-block bg-highlight px-3 pb-1 font-display-serif italic font-normal">보이게</span> 하고,
              <br />
              순간을 영원으로.
            </p>
          </div>
        </div>

        <div className="absolute bottom-5 left-5 z-20 hidden font-mono text-[9px] tracking-[0.2em] text-white/45 lg:block">
          {heroWork.titleKo} · {heroWork.titleEn} · CUT {String(activeFrame + 1).padStart(2, '0')}
        </div>
        <button
          type="button"
          onClick={openWork}
          className="absolute bottom-5 right-5 z-20 hidden items-center gap-3 font-mono text-[9px] tracking-[0.2em] text-white/65 transition-colors hover:text-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight lg:flex"
        >
          VIEW SELECTED WORK <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
