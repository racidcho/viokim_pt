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
  const mobileFilmStripRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const [frameMode, setFrameMode] = useState(false);
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
  const frameVisible = desktop || frameMode;
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

  const selectFrameFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!desktop || !frameVisible || event.pointerType === 'touch') return;
    const next = Math.min(
      frameCount - 1,
      Math.floor(clamp(event.clientX / viewport.width) * frameCount)
    );
    setActiveFrame(next);
  };

  const openDesktopFrame = (index: number) => {
    window.scrollTo({ top: sectionRef.current?.offsetTop ?? 0, behavior: 'instant' });
    setActiveFrame(index);
    setFrameMode(true);
  };

  const openWork = () => {
    playSlate(`/work/${heroWork.slug}`, {
      scene: 'SCENE 01',
      title: heroWork.titleKo,
      subtitle: `${heroWork.titleEn} · ${heroWork.year}`,
    });
  };

  const updateMobileFrameFromScroll = () => {
    const filmStrip = mobileFilmStripRef.current;
    if (!filmStrip || filmStrip.clientHeight === 0) return;
    const nextFrame = Math.min(
      frameCount - 1,
      Math.max(0, Math.round(filmStrip.scrollTop / filmStrip.clientHeight))
    );
    setActiveFrame(nextFrame);
  };

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-[100svh] bg-black lg:h-[175svh]">
      <div className="relative min-h-[100svh] overflow-hidden bg-black lg:sticky lg:top-0 lg:h-[100svh]">
        <div className="hidden lg:block">
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${frameVisible ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
            aria-hidden={frameVisible}
          >
            <img
              src={heroWork.stills[activeFrame]}
              alt=""
              className="cut-in h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div
            className={`panel-enter absolute z-10 flex flex-col overflow-hidden bg-[#ecebe6] text-black shadow-[0_30px_90px_rgba(0,0,0,0.42)] transition-opacity duration-300 ${frameVisible ? 'invisible pointer-events-none opacity-0' : 'visible opacity-100'}`}
            style={panelStyle}
            aria-hidden={frameVisible}
          >
            <header className="relative z-20 flex min-h-16 items-center justify-between gap-5 border-b border-black/15 px-8">
              <a
                href="#hero"
                className="text-sm font-semibold tracking-[-0.03em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
              >
                VIO KIM
              </a>
              <nav aria-label="주요 메뉴" className="flex items-center gap-7">
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
            </header>

            <div
              className="relative flex min-h-0 flex-1 flex-col"
              style={{ opacity: identityFade, transform: `translateY(${-18 * (1 - identityFade)}px)` }}
            >
              <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-8 pb-5 pt-8 text-center">
                <p className="mb-5 font-mono text-[11px] tracking-[0.36em] text-black/50">
                  DIRECTOR OF PHOTOGRAPHY · SEOUL
                </p>
                <h1 className="flex max-w-full items-center justify-center whitespace-nowrap text-[clamp(8rem,12vw,11.5rem)] font-bold leading-[0.82] tracking-[-0.09em]">
                  <span>VIO</span>
                  <span className="ml-[0.08em] bg-highlight px-[0.1em] pb-[0.08em] text-black">KIM</span>
                </h1>
                <p className="mt-7 text-balance text-lg font-medium leading-relaxed text-black/60">
                  빛과 어둠 사이, 프레임 안의 이야기.
                </p>
              </div>

              <div className="border-t border-black/15 px-6 pb-5 pt-3">
                <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[9px] tracking-[0.2em] text-black/45">
                  <span className="text-highlight">→ SELECT A CUT · THEN MOVE TO SCRUB</span>
                  <span>{heroWork.titleKo} · {heroWork.titleEn}</span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {heroWork.stills.map((still, index) => {
                    const active = index === activeFrame;
                    return (
                      <button
                        key={still}
                        type="button"
                        onClick={() => openDesktopFrame(index)}
                        onFocus={() => setActiveFrame(index)}
                        className={`group border-t-2 pt-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight ${
                          active ? 'border-highlight text-highlight' : 'border-transparent text-black/45 hover:border-black/30 hover:text-black'
                        }`}
                        aria-pressed={active}
                        aria-label={`${heroWork.titleKo} 컷 ${index + 1} 전체 프레임 보기`}
                      >
                        <span className="mb-2 block text-center font-mono text-[9px] tracking-[0.18em]">
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
              className="pointer-events-none absolute inset-0 z-10 grid grid-cols-[0.8fr_1.2fr] gap-16 bg-[#ecebe6] px-8 pb-10 pt-28"
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
                <span className="inline-block bg-highlight px-3 pb-1 font-korean-display italic font-normal">보이게</span> 하고,
                <br />
                순간을 영원으로.
              </p>
            </div>
          </div>

          <div
            className={`absolute inset-0 z-30 flex flex-col bg-black transition-opacity duration-300 ${frameVisible ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'}`}
            onPointerMove={selectFrameFromPointer}
            aria-hidden={!frameVisible}
          >
            <header className="flex h-20 shrink-0 items-center justify-between border-b border-white/15 px-8 text-white">
              <div>
                <p className="font-mono text-[9px] tracking-[0.22em] text-highlight">FULL FRAME · {String(activeFrame + 1).padStart(2, '0')} / {String(frameCount).padStart(2, '0')}</p>
                <p className="mt-2 text-sm">{heroWork.titleKo} · {heroWork.titleEn}</p>
              </div>
              <div className="flex items-center gap-8">
                <span className="font-mono text-[9px] tracking-[0.22em] text-white/40">MOVE HORIZONTALLY TO SCRUB</span>
                <button
                  type="button"
                  onClick={openWork}
                  className="flex h-11 items-center gap-2 border border-white/25 px-4 font-mono text-[9px] tracking-[0.18em] text-white/65 transition-colors hover:border-highlight hover:text-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
                >
                  VIEW WORK <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-10 py-6" data-cursor data-cursor-text="SCRUB">
              <img
                key={heroWork.stills[activeFrame]}
                src={heroWork.stills[activeFrame]}
                alt={`${heroWork.titleKo} 전체 프레임 ${activeFrame + 1}`}
                className="cut-in max-h-full max-w-full object-contain"
              />
              <span className="sr-only" aria-live="polite">CUT {activeFrame + 1} 선택됨</span>
            </div>

            <div className="shrink-0 border-t border-white/15 bg-black px-8 pb-5 pt-4">
              <div className="grid grid-cols-[1fr_auto] items-end gap-8">
                <div className="grid grid-cols-6 gap-3">
                  {heroWork.stills.map((still, index) => {
                    const active = index === activeFrame;
                    return (
                      <button
                        key={still}
                        type="button"
                        onClick={() => setActiveFrame(index)}
                        onFocus={() => setActiveFrame(index)}
                        className={`group border-t-2 pt-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight ${active ? 'border-highlight text-highlight' : 'border-white/10 text-white/35 hover:border-white/35 hover:text-white'}`}
                        aria-pressed={active}
                        aria-label={`${heroWork.titleKo} 컷 ${index + 1} 보기`}
                      >
                        <span className="mb-2 block font-mono text-[8px] tracking-[0.18em]">CUT {String(index + 1).padStart(2, '0')}</span>
                        <img src={still} alt="" className={`aspect-[2.39/1] w-full object-cover ${active ? 'opacity-100' : 'opacity-45 group-hover:opacity-80'}`} />
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={openWork}
                  className="mb-1 flex items-center gap-3 font-mono text-[9px] tracking-[0.2em] text-white/65 transition-colors hover:text-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
                >
                  VIEW WORK <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className={`absolute bottom-5 left-5 z-20 font-mono text-[9px] tracking-[0.2em] text-white/45 transition-opacity ${frameVisible ? 'opacity-0' : 'opacity-100'}`}>
            {heroWork.titleKo} · {heroWork.titleEn} · ATMOSPHERIC CROP
          </div>
          <button
            type="button"
            onClick={openWork}
            className={`absolute bottom-5 right-5 z-20 flex items-center gap-3 font-mono text-[9px] tracking-[0.2em] text-white/65 transition-colors hover:text-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight ${frameVisible ? 'invisible pointer-events-none opacity-0' : 'visible opacity-100'}`}
          >
            VIEW SELECTED WORK <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="relative flex h-[100svh] flex-col overflow-hidden px-4 pb-5 pt-20 lg:hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <img
              key={heroWork.stills[activeFrame]}
              src={heroWork.stills[activeFrame]}
              alt=""
              className="mobile-film-ambient h-full w-full scale-110 object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.25)_38%,rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.94)_100%)]" />
          </div>

          <header className="relative z-20 flex shrink-0 items-end justify-between border-b border-white/20 pb-3">
            <div>
              <h1 className="text-[1.1rem] font-semibold leading-none tracking-[-0.045em]">VIO KIM</h1>
              <p className="mt-2 font-mono text-[7px] tracking-[0.24em] text-white/55">DIRECTOR OF PHOTOGRAPHY</p>
            </div>
            <p className="font-mono text-[7px] tracking-[0.22em] text-highlight">SEOUL · KR</p>
          </header>

          <div className="relative z-20 mt-4 flex shrink-0 items-end justify-between gap-5">
            <div>
              <p className="font-mono text-[7px] tracking-[0.2em] text-highlight">OPENING SEQUENCE · 01</p>
              <p className="mt-1 text-[1.35rem] font-medium leading-tight tracking-[-0.045em]">
                {heroWork.titleKo}
                <span className="english-display ml-2 text-[0.95rem] font-medium tracking-[-0.025em] text-white/[0.62]">{heroWork.titleEn}</span>
              </p>
            </div>
            <p className="shrink-0 font-mono text-[8px] tracking-[0.18em] text-white/68">
              CUT {String(activeFrame + 1).padStart(2, '0')} / {String(frameCount).padStart(2, '0')}
            </p>
          </div>

          <div
            ref={mobileFilmStripRef}
            onScroll={updateMobileFrameFromScroll}
            className="cinematic-film-strip relative z-20 mt-3 h-[52svh] min-h-[300px] snap-y snap-mandatory overflow-y-auto overscroll-contain border-y border-white/20 bg-black/35"
            aria-label={`${heroWork.titleKo} 세로 필름 스트립`}
          >
            {heroWork.stills.map((still, index) => {
              const active = activeFrame === index;
              return (
                <button
                  key={still}
                  type="button"
                  onClick={() => {
                    if (active) openWork();
                  }}
                  onFocus={() => setActiveFrame(index)}
                  className="group flex h-full w-full shrink-0 snap-center items-center justify-center px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-highlight"
                  aria-current={active ? 'true' : undefined}
                  aria-label={`${heroWork.titleKo} 컷 ${index + 1}${active ? ', 탭하여 작품 보기' : ''}`}
                >
                  <span className={`relative block w-full transition-[opacity,transform] duration-500 ${active ? 'scale-100 opacity-100' : 'scale-[0.94] opacity-35'}`}>
                    <span className="absolute -top-6 left-0 font-mono text-[7px] tracking-[0.2em] text-white/45" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')} · {heroWork.year}
                    </span>
                    <img
                      src={still}
                      alt={`${heroWork.titleKo} 스틸 ${index + 1}`}
                      draggable={false}
                      className="aspect-[2.39/1] w-full bg-black object-contain shadow-[0_22px_70px_rgba(0,0,0,0.5)]"
                    />
                    <span className={`absolute inset-x-0 -bottom-7 flex items-center justify-between font-mono text-[7px] tracking-[0.18em] transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
                      <span className="text-highlight">ACTIVE FRAME</span>
                      <span className="text-white/[0.48]">TAP TO ENTER ↗</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative z-20 mt-auto flex min-h-12 shrink-0 items-end justify-between gap-4 pt-3">
            <p className="font-mono text-[7px] tracking-[0.19em] text-white/55">
              SWIPE TO CUT · TAP TO ENTER
            </p>
            <a
              href="#works"
              className="flex min-h-11 items-center gap-2 font-mono text-[7px] tracking-[0.18em] text-white/68 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
            >
              VIEW ALL WORKS <span className="text-highlight">↓</span>
            </a>
          </div>

          <span className="sr-only" aria-live="polite">컷 {activeFrame + 1} 선택됨</span>
        </div>
      </div>
    </section>
  );
}
