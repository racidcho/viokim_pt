import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { navigationConfig } from '../config';
import { useSlateNavigate } from '../components/Slate';
import { works } from '../works-data';

const heroWork = works[0];
const frameCount = heroWork.stills.length;
const nextHeroWork = works[1];

type MobileViewMode = 'frame' | 'contact' | 'notes';

const heroCamera = heroWork.specs.find((spec) => spec.label === 'CAMERA')?.value ?? 'DIGITAL CINEMA';
const heroLenses = heroWork.specs.find((spec) => spec.label === 'LENSES')?.value ?? 'CINEMA LENSES';
const heroRecording = heroWork.specs.find((spec) => spec.label === 'RECORDING')?.value ?? 'DIGITAL 4K';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function Hero() {
  const playSlate = useSlateNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const mobileScrubRef = useRef<HTMLDivElement>(null);
  const mobileScrubPointerRef = useRef<number | null>(null);
  const pullStartRef = useRef<{ pointerId: number; y: number } | null>(null);
  const pullProgressRef = useRef(0);
  const pullTriggeredRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const [frameMode, setFrameMode] = useState(false);
  const [mobileViewMode, setMobileViewMode] = useState<MobileViewMode>('frame');
  const [mobileIdentityCollapsed, setMobileIdentityCollapsed] = useState(false);
  const [mobileScrubbing, setMobileScrubbing] = useState(false);
  const [pullProgress, setPullProgress] = useState(0);
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
  const frameVisible = frameMode;
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

  const selectMobileFrame = (index: number) => {
    setMobileIdentityCollapsed(true);
    setActiveFrame(index);
  };

  const scrubMobileFrame = (clientX: number) => {
    const surface = mobileScrubRef.current;
    if (!surface) return;
    const rect = surface.getBoundingClientRect();
    const progress = clamp((clientX - rect.left) / rect.width);
    setActiveFrame(Math.min(frameCount - 1, Math.floor(progress * frameCount)));
  };

  const startMobileScrub = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    mobileScrubPointerRef.current = event.pointerId;
    setMobileIdentityCollapsed(true);
    setMobileScrubbing(true);
    scrubMobileFrame(event.clientX);
  };

  const moveMobileScrub = (event: React.PointerEvent<HTMLDivElement>) => {
    if (mobileScrubPointerRef.current !== event.pointerId) return;
    scrubMobileFrame(event.clientX);
  };

  const endMobileScrub = (event: React.PointerEvent<HTMLDivElement>) => {
    if (mobileScrubPointerRef.current !== event.pointerId) return;
    mobileScrubPointerRef.current = null;
    setMobileScrubbing(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const changeMobileViewMode = (mode: MobileViewMode) => {
    setMobileIdentityCollapsed(true);
    setMobileViewMode(mode);
  };

  const startWorkPull = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pullStartRef.current = { pointerId: event.pointerId, y: event.clientY };
    pullTriggeredRef.current = false;
  };

  const moveWorkPull = (event: React.PointerEvent<HTMLButtonElement>) => {
    const start = pullStartRef.current;
    if (!start || start.pointerId !== event.pointerId) return;
    const progress = clamp((start.y - event.clientY) / 96);
    pullProgressRef.current = progress;
    setPullProgress(progress);
  };

  const endWorkPull = (event: React.PointerEvent<HTMLButtonElement>) => {
    const start = pullStartRef.current;
    if (!start || start.pointerId !== event.pointerId) return;
    const releaseProgress = clamp((start.y - event.clientY) / 96);
    const shouldOpen = Math.max(pullProgressRef.current, releaseProgress) >= 0.55;
    pullStartRef.current = null;
    pullProgressRef.current = 0;
    setPullProgress(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (shouldOpen) {
      pullTriggeredRef.current = true;
      openWork();
    }
  };

  const openWork = () => {
    playSlate(`/work/${heroWork.slug}`, {
      scene: 'SCENE 01',
      title: heroWork.titleKo,
      subtitle: `${heroWork.titleEn} · ${heroWork.year}`,
    });
  };

  const openNextWork = () => {
    playSlate(`/work/${nextHeroWork.slug}`, {
      scene: 'SCENE 02',
      title: nextHeroWork.titleKo,
      subtitle: `${nextHeroWork.titleEn} · ${nextHeroWork.year}`,
    });
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
                <span className="inline-block bg-highlight px-3 pb-1 font-display-serif italic font-normal">보이게</span> 하고,
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
                  onClick={() => setFrameMode(false)}
                  className="flex h-11 items-center gap-2 border border-white/25 px-4 font-mono text-[9px] tracking-[0.18em] text-white/65 transition-colors hover:border-highlight hover:text-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
                >
                  CLOSE <X className="h-4 w-4" />
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

        <div className="flex min-h-[100svh] flex-col px-4 pb-8 pt-20 lg:hidden">
          <div
            className={`overflow-hidden bg-[#ecebe6] text-black transition-[max-height] duration-500 ${mobileIdentityCollapsed ? 'max-h-[58px]' : 'max-h-[310px]'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            <div className="flex h-[58px] items-center justify-between border-b border-black/15 px-5">
              <button
                type="button"
                onClick={() => setMobileIdentityCollapsed((collapsed) => !collapsed)}
                className="flex h-11 items-center text-xs font-semibold tracking-[-0.03em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
                aria-expanded={!mobileIdentityCollapsed}
                aria-controls="mobile-identity"
              >
                VIO KIM
              </button>
              <span className="font-mono text-[8px] tracking-[0.22em] text-black/45">
                {mobileIdentityCollapsed ? 'TAP TO OPEN' : 'DOP · SEOUL'}
              </span>
            </div>
            <div
              id="mobile-identity"
              className={`px-5 text-center transition-[opacity,transform] duration-300 ${mobileIdentityCollapsed ? '-translate-y-3 opacity-0' : 'translate-y-0 opacity-100'}`}
              aria-hidden={mobileIdentityCollapsed}
            >
              <div className="py-9">
                <p className="mb-4 font-mono text-[8px] tracking-[0.28em] text-black/45">DIRECTOR OF PHOTOGRAPHY</p>
                <h1 className="flex items-center justify-center whitespace-nowrap text-[18vw] font-bold leading-[0.82] tracking-[-0.09em]">
                  <span>VIO</span>
                  <span className="ml-[0.08em] bg-highlight px-[0.1em] pb-[0.08em]">KIM</span>
                </h1>
                <p className="mt-6 text-sm text-black/60">빛과 어둠 사이, 프레임 안의 이야기.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-1 flex-col">
            <div className="mb-2 flex items-center justify-between font-mono text-[8px] tracking-[0.18em]">
              <span className={mobileScrubbing ? 'text-highlight' : 'text-white/45'}>
                {mobileScrubbing ? 'SCRUBBING · RELEASE TO HOLD' : 'TOUCH + DRAG THE FRAME'}
              </span>
              <span className="text-highlight">CUT {String(activeFrame + 1).padStart(2, '0')} / {String(frameCount).padStart(2, '0')}</span>
            </div>

            <div className="relative min-h-[38svh] overflow-hidden border-y border-white/15 bg-[#070909]">
              {mobileViewMode === 'contact' ? (
                <div className="grid min-h-[38svh] grid-cols-2 content-center gap-x-2 gap-y-4 p-3" aria-label={`${heroWork.titleKo} 콘택트시트`}>
                  {heroWork.stills.map((still, index) => (
                    <button
                      key={still}
                      type="button"
                      onClick={() => {
                        selectMobileFrame(index);
                        setMobileViewMode('frame');
                      }}
                      className={`border-t-2 pt-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight ${activeFrame === index ? 'border-highlight text-highlight' : 'border-white/15 text-white/35'}`}
                      aria-label={`컷 ${index + 1}을 프레임 모드로 보기`}
                    >
                      <span className="mb-1 block font-mono text-[7px] tracking-[0.16em]">CUT {String(index + 1).padStart(2, '0')}</span>
                      <img src={still} alt="" className="aspect-[2.39/1] w-full bg-black object-contain" />
                    </button>
                  ))}
                </div>
              ) : (
                <div
                  ref={mobileScrubRef}
                  role="slider"
                  tabIndex={0}
                  aria-label={`${heroWork.titleKo} 프레임 스크럽`}
                  aria-valuemin={1}
                  aria-valuemax={frameCount}
                  aria-valuenow={activeFrame + 1}
                  aria-valuetext={`컷 ${activeFrame + 1}`}
                  onPointerDown={startMobileScrub}
                  onPointerMove={moveMobileScrub}
                  onPointerUp={endMobileScrub}
                  onPointerCancel={endMobileScrub}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowRight') {
                      event.preventDefault();
                      selectMobileFrame(Math.min(frameCount - 1, activeFrame + 1));
                    }
                    if (event.key === 'ArrowLeft') {
                      event.preventDefault();
                      selectMobileFrame(Math.max(0, activeFrame - 1));
                    }
                  }}
                  className="relative flex min-h-[38svh] touch-pan-y select-none items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-highlight"
                >
                  <img
                    key={heroWork.stills[activeFrame]}
                    src={heroWork.stills[activeFrame]}
                    alt={`${heroWork.titleKo} 전체 프레임 ${activeFrame + 1}`}
                    draggable={false}
                    className="cut-in pointer-events-none h-auto max-h-[38svh] w-full object-contain"
                  />

                  {mobileViewMode === 'notes' && (
                    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-black/10 p-3 font-mono text-[7px] tracking-[0.15em] text-white">
                      <div className="flex items-start justify-between gap-5">
                        <span className="max-w-[58%] border-l border-t border-highlight px-2 py-1.5">
                          CAMERA<br /><strong className="font-medium text-highlight">{heroCamera}</strong>
                        </span>
                        <span className="border-r border-t border-highlight px-2 py-1.5 text-right">
                          FRAME<br /><strong className="font-medium text-highlight">2.39 : 1</strong>
                        </span>
                      </div>
                      <div className="flex items-end justify-between gap-4">
                        <span className="max-w-[62%] border-b border-l border-highlight px-2 py-1.5">
                          LENS / RECORDING<br /><strong className="font-medium text-highlight">{heroLenses}<br />{heroRecording}</strong>
                        </span>
                        <span className="border-b border-r border-highlight px-2 py-1.5 text-right">
                          LOOK<br /><strong className="font-medium text-highlight">CYAN · MAGENTA<br />SLOW PUSH</strong>
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-x-0 bottom-2 grid grid-cols-6 gap-1 px-3" aria-hidden="true">
                    {heroWork.stills.map((still, index) => (
                      <span key={still} className={`h-px ${activeFrame === index ? 'bg-highlight' : 'bg-white/25'}`} />
                    ))}
                  </div>
                  <span className="sr-only" aria-live="polite">컷 {activeFrame + 1} 선택됨</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 border-b border-white/15" aria-label="프레임 감상 모드">
              {([
                ['frame', 'FRAME'],
                ['contact', 'CONTACT'],
                ['notes', 'DP NOTES'],
              ] as const).map(([mode, label]) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => changeMobileViewMode(mode)}
                  className={`h-12 border-r border-white/15 font-mono text-[8px] tracking-[0.16em] last:border-r-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-highlight ${mobileViewMode === mode ? 'bg-[#ecebe6] text-black' : 'text-white/45'}`}
                  aria-pressed={mobileViewMode === mode}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-6 gap-1" aria-label="프레임 선택">
              {heroWork.stills.map((still, index) => (
                <button
                  key={still}
                  type="button"
                  onClick={() => selectMobileFrame(index)}
                  className={`h-11 border-t-2 font-mono text-[8px] tracking-[0.14em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight ${activeFrame === index ? 'border-highlight text-highlight' : 'border-white/15 text-white/35'}`}
                  aria-pressed={activeFrame === index}
                  aria-label={`컷 ${index + 1}로 이동`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                if (pullTriggeredRef.current) {
                  pullTriggeredRef.current = false;
                  return;
                }
                openWork();
              }}
              onPointerDown={startWorkPull}
              onPointerMove={moveWorkPull}
              onPointerUp={endWorkPull}
              onPointerCancel={endWorkPull}
              className="relative mt-2 min-h-[72px] touch-none overflow-hidden border-y border-white/15 px-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
              aria-label={`${heroWork.titleKo} 상세 보기. 탭하거나 위로 당겨서 열기`}
            >
              <span
                className="flex items-center justify-between transition-transform duration-150"
                style={{ transform: `translateY(${-10 * pullProgress}px)` }}
              >
                <span>
                  <span className="block font-mono text-[7px] tracking-[0.18em] text-highlight">↑ PULL UP OR TAP</span>
                  <span className="mt-1 block text-lg font-medium tracking-[-0.035em]">{heroWork.titleKo} · {heroWork.titleEn}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-highlight" />
              </span>
              <span
                className="absolute inset-x-4 bottom-1 h-px origin-left bg-highlight transition-transform duration-100"
                style={{ transform: `scaleX(${Math.max(0.08, pullProgress)})` }}
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={openNextWork}
              className="group mt-3 grid min-h-[58px] grid-cols-[1fr_64px] items-stretch overflow-hidden border border-white/15 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
            >
              <span className="flex items-center justify-between gap-4 px-4">
                <span>
                  <span className="block font-mono text-[7px] tracking-[0.18em] text-white/35">NEXT FRAME STUDY</span>
                  <span className="mt-1 block text-sm text-white/75">{nextHeroWork.titleKo} · {nextHeroWork.titleEn}</span>
                </span>
                <span className="font-mono text-[8px] tracking-[0.16em] text-highlight">PEEK ↗</span>
              </span>
              <span className="relative overflow-hidden border-l border-white/15">
                <img src={nextHeroWork.stills[0]} alt="" className="absolute inset-0 h-full w-[190px] max-w-none object-cover object-center transition-transform duration-500 group-hover:-translate-x-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
