import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { ArrowDown } from 'lucide-react';

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const interpolate = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

const smoothstep = (start: number, end: number, value: number) => {
  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
};

type OpeningStage = 0 | 1 | 2 | 3;

export function CinematicAperture() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [reduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [openingStage, setOpeningStage] = useState<OpeningStage>(
    reduceMotion ? 2 : 0
  );

  useEffect(() => {
    const update = () => {
      rafRef.current = null;

      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const mobile = viewportWidth < 1024;
      const maxScroll = Math.max(1, section.offsetHeight - viewportHeight);
      const progress = reduceMotion
        ? 0
        : clamp(-section.getBoundingClientRect().top / maxScroll);
      const openProgress = reduceMotion ? 1 : smoothstep(0.1, 0.58, progress);
      const titleProgress = reduceMotion ? 1 : smoothstep(0.48, 0.72, progress);
      const exitProgress = reduceMotion ? 0 : smoothstep(0.8, 1, progress);
      const cueProgress = reduceMotion ? 0 : 1 - smoothstep(0.06, 0.34, progress);

      const initialFrameHeight = mobile
        ? Math.min(116, Math.max(92, viewportWidth * 0.24))
        : Math.min(136, Math.max(88, viewportWidth * 0.1));
      const targetFrameWidth = mobile
        ? viewportWidth - 20
        : Math.min(viewportWidth * 0.86, viewportHeight * 0.72 * 2.39, 1440);
      const targetFrameHeight = targetFrameWidth / 2.39;

      stage.style.setProperty('--aperture-progress', progress.toFixed(4));
      stage.style.setProperty('--aperture-open', openProgress.toFixed(4));
      stage.style.setProperty('--aperture-title', titleProgress.toFixed(4));
      stage.style.setProperty('--aperture-exit', exitProgress.toFixed(4));
      stage.style.setProperty('--aperture-cue', cueProgress.toFixed(4));
      stage.style.setProperty(
        '--aperture-word-opacity',
        (1 - openProgress * 0.92).toFixed(4)
      );
      stage.style.setProperty(
        '--aperture-title-opacity',
        (titleProgress * (1 - exitProgress * 0.82)).toFixed(4)
      );
      stage.style.setProperty(
        '--aperture-stage-opacity',
        (1 - exitProgress * 0.62).toFixed(4)
      );
      stage.style.setProperty(
        '--aperture-stage-scale',
        (1 - exitProgress * 0.018).toFixed(4)
      );
      stage.style.setProperty(
        '--aperture-eyebrow-opacity',
        (1 - titleProgress).toFixed(4)
      );
      stage.style.setProperty(
        '--aperture-vio-x',
        `${-openProgress * 112}%`
      );
      stage.style.setProperty(
        '--aperture-kim-x',
        `${openProgress * 112}%`
      );
      stage.style.setProperty(
        '--aperture-vio-y',
        `${-openProgress * 125}svh`
      );
      stage.style.setProperty(
        '--aperture-kim-y',
        `${openProgress * 125}svh`
      );
      stage.style.setProperty(
        '--aperture-frame-w',
        `${interpolate(viewportWidth, targetFrameWidth, openProgress)}px`
      );
      stage.style.setProperty(
        '--aperture-frame-h',
        `${interpolate(initialFrameHeight, targetFrameHeight, openProgress)}px`
      );

      const nextStage: OpeningStage =
        progress >= 0.8 ? 3 : progress >= 0.5 ? 2 : progress >= 0.12 ? 1 : 0;
      setOpeningStage((current) => (current === nextStage ? current : nextStage));
    };

    const requestUpdate = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [reduceMotion]);

  const updatePointerPosition = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;

    const stage = stageRef.current;
    if (!stage) return;

    const bounds = stage.getBoundingClientRect();
    const relativeX = clamp((event.clientX - bounds.left) / bounds.width);
    const relativeY = clamp((event.clientY - bounds.top) / bounds.height);

    stage.style.setProperty('--aperture-video-x', `${44 + relativeX * 12}%`);
    stage.style.setProperty('--aperture-video-y', `${45 + relativeY * 10}%`);
  };

  return (
    <section
      ref={sectionRef}
      className="scroll-aperture relative text-white"
      data-testid="aperture-opening"
      aria-label="VIO KIM 시네마틱 스크롤 오프닝"
    >
      <div
        ref={stageRef}
        className="scroll-aperture__stage sticky top-0 isolate h-[100svh] overflow-hidden bg-black"
        data-opening-stage={openingStage}
        onPointerMove={updatePointerPosition}
      >
        <div className="scroll-aperture__motion" aria-hidden="true">
          <video
            className="scroll-aperture__motion-video"
            src="/motion/vio-kim-opening.mp4"
            poster="/stills/be-my-baby/5.jpg"
            autoPlay={!reduceMotion}
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>

        <div className="scroll-aperture__mask" aria-hidden="true">
          <span className="scroll-aperture__word scroll-aperture__word--vio">
            VIO
          </span>
          <span className="scroll-aperture__word scroll-aperture__word--kim">
            KIM
          </span>
        </div>

        <header className="scroll-aperture__eyebrow">
          <span>DIRECTOR OF PHOTOGRAPHY</span>
          <span>SEOUL · KR</span>
        </header>

        <div
          className="scroll-aperture__frame"
          data-testid="aperture-frame"
          aria-hidden="true"
        >
          <video
            className="scroll-aperture__frame-video"
            src="/motion/vio-kim-opening.mp4"
            poster="/stills/be-my-baby/5.jpg"
            autoPlay={!reduceMotion}
            muted
            loop
            playsInline
            preload="auto"
          />
          <span className="scroll-aperture__frame-vignette" />
          <span className="scroll-aperture__frame-label">
            FRAME OPEN · 2.39:1
          </span>
        </div>

        <div className="scroll-aperture__title">
          <p className="font-display-serif italic">BE MY BABY</p>
          <p>2026 · FEATURE FILM · CINEMATOGRAPHY</p>
        </div>

        <div className="scroll-aperture__intro-meta" aria-hidden="true">
          <span className="font-display-serif italic">BE MY BABY</span>
          <span>· OPENING STUDY</span>
        </div>

        <div className="scroll-aperture__cue" aria-hidden="true">
          <span className="scroll-aperture__cue-desktop">
            SCROLL TO OPEN THE FRAME
          </span>
          <span className="scroll-aperture__cue-mobile">
            SWIPE UP TO OPEN
          </span>
          <ArrowDown />
        </div>

        <div className="scroll-aperture__progress" aria-hidden="true">
          <span />
        </div>

        <a
          href="#hero"
          className="scroll-aperture__skip"
          data-testid="aperture-skip"
        >
          SKIP OPENING
          <ArrowDown aria-hidden="true" />
        </a>

        <p className="sr-only" aria-live="polite">
          {openingStage === 0 && '스크롤하여 시네마틱 오프닝을 시작합니다.'}
          {openingStage === 1 && '필름 프레임을 여는 중입니다.'}
          {openingStage === 2 && '전체 2.39대 1 프레임이 열렸습니다.'}
          {openingStage === 3 && '계속 스크롤하면 포트폴리오로 이동합니다.'}
        </p>
      </div>
    </section>
  );
}
