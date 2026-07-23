import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { ArrowUpRight } from 'lucide-react';

const HOLD_DURATION = 560;
const EXIT_DURATION = 460;

interface CinematicApertureProps {
  onOpenWork: () => void;
}

export function CinematicAperture({ onOpenWork }: CinematicApertureProps) {
  const [reduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const rootRef = useRef<HTMLElement>(null);
  const maskVideoRef = useRef<HTMLVideoElement>(null);
  const frameVideoRef = useRef<HTMLVideoElement>(null);
  const holdTimerRef = useRef<number | null>(null);
  const exitTimerRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(true);
  const [frameOpen, setFrameOpen] = useState(reduceMotion);
  const [holding, setHolding] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const clearHoldTimer = useCallback(() => {
    if (holdTimerRef.current !== null) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  }, []);

  const openFrame = useCallback(() => {
    clearHoldTimer();
    setHolding(false);

    const maskVideo = maskVideoRef.current;
    const frameVideo = frameVideoRef.current;
    if (maskVideo && frameVideo) {
      frameVideo.currentTime = maskVideo.currentTime;
      if (!reduceMotion) {
        void frameVideo.play().catch(() => undefined);
      }
    }

    setFrameOpen(true);
  }, [clearHoldTimer, reduceMotion]);

  const leaveOpening = useCallback(
    (target: '#hero' | '#filmography' | 'work') => {
      if (leaving) return;
      clearHoldTimer();
      setHolding(false);
      setLeaving(true);

      exitTimerRef.current = window.setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = '';

        window.requestAnimationFrame(() => {
          if (target === 'work') {
            onOpenWork();
            return;
          }

          window.requestAnimationFrame(() => {
            document.querySelector(target)?.scrollIntoView({
              behavior: 'auto',
              block: 'start',
            });
          });
        });
      }, EXIT_DURATION);
    },
    [clearHoldTimer, leaving, onOpenWork]
  );

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        leaveOpening('#hero');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [leaveOpening, visible]);

  useEffect(
    () => () => {
      clearHoldTimer();
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
      }
    },
    [clearHoldTimer]
  );

  const updatePointerPosition = (event: ReactPointerEvent<HTMLElement>) => {
    const root = rootRef.current;
    if (!root) return;

    const bounds = root.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width;
    const relativeY = (event.clientY - bounds.top) / bounds.height;

    root.style.setProperty('--aperture-video-x', `${42 + relativeX * 16}%`);
    root.style.setProperty('--aperture-video-y', `${44 + relativeY * 12}%`);
    root.style.setProperty('--aperture-hold-x', `${event.clientX - bounds.left}px`);
    root.style.setProperty('--aperture-hold-y', `${event.clientY - bounds.top}px`);
  };

  const beginHold = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (frameOpen || leaving) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePointerPosition(event);
    clearHoldTimer();
    setHolding(true);
    holdTimerRef.current = window.setTimeout(openFrame, HOLD_DURATION);
  };

  const cancelHold = () => {
    if (frameOpen) return;
    clearHoldTimer();
    setHolding(false);
  };

  const openFromKeyboard = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openFrame();
    }
  };

  const ignoreShortPointerClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) {
      openFrame();
    }
  };

  if (!visible) return null;

  return (
    <section
      ref={rootRef}
      className={`cinematic-aperture fixed inset-0 z-[70] isolate overflow-hidden bg-black text-white ${
        frameOpen ? 'is-frame-open' : ''
      } ${holding ? 'is-holding' : ''} ${leaving ? 'is-leaving' : ''}`}
      data-testid="aperture-opening"
      role="dialog"
      aria-modal="true"
      aria-label="VIO KIM 시네마틱 오프닝"
      onPointerMove={updatePointerPosition}
    >
      <div className="cinematic-aperture__motion" aria-hidden="true">
        <video
          ref={maskVideoRef}
          className="cinematic-aperture__motion-video"
          src="/motion/vio-kim-opening.mp4"
          poster="/stills/be-my-baby/5.jpg"
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      <div className="cinematic-aperture__mask" aria-hidden="true">
        <span className="cinematic-aperture__word cinematic-aperture__word--vio">
          VIO
        </span>
        <span className="cinematic-aperture__word cinematic-aperture__word--kim">
          KIM
        </span>
      </div>

      <header className="cinematic-aperture__eyebrow">
        <span>DIRECTOR OF PHOTOGRAPHY</span>
        <span>SEOUL · KR</span>
      </header>

      <div
        className="cinematic-aperture__frame"
        data-testid="aperture-frame"
        aria-hidden="true"
      >
        <video
          ref={frameVideoRef}
          className="cinematic-aperture__frame-video"
          src="/motion/vio-kim-opening.mp4"
          poster="/stills/be-my-baby/5.jpg"
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="auto"
        />
        <span className="cinematic-aperture__frame-vignette" />
      </div>

      <button
        type="button"
        className="cinematic-aperture__hold-target"
        data-testid="aperture-hold-target"
        aria-label={frameOpen ? '프레임이 열렸습니다' : '길게 눌러 전체 프레임 열기'}
        aria-pressed={frameOpen}
        disabled={frameOpen}
        onPointerDown={beginHold}
        onPointerUp={cancelHold}
        onPointerCancel={cancelHold}
        onPointerLeave={cancelHold}
        onKeyDown={openFromKeyboard}
        onClick={ignoreShortPointerClick}
        onContextMenu={(event) => event.preventDefault()}
      >
        <span className="cinematic-aperture__hold-label">
          {frameOpen ? 'FRAME OPEN · 2.39:1' : 'HOLD TO OPEN THE FRAME'}
        </span>
      </button>

      <span className="cinematic-aperture__hold-ring" aria-hidden="true" />

      <div className="cinematic-aperture__meta" aria-hidden="true">
        <span className="font-display-serif italic">BE MY BABY</span>
        <span>· OPENING STUDY</span>
      </div>

      <div className="cinematic-aperture__closed-actions">
        <button
          type="button"
          onClick={() => leaveOpening('#filmography')}
          className="cinematic-aperture__primary-action"
          data-testid="aperture-enter-filmography-closed"
        >
          ENTER FILMOGRAPHY
          <ArrowUpRight aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => leaveOpening('#hero')}
          className="cinematic-aperture__quiet-action"
          data-testid="aperture-view-without-motion"
        >
          VIEW WITHOUT MOTION
        </button>
      </div>

      <div className="cinematic-aperture__open-actions">
        <button
          type="button"
          onClick={() => leaveOpening('#filmography')}
          className="cinematic-aperture__primary-action"
          data-testid="aperture-enter-filmography"
        >
          ENTER FILMOGRAPHY
          <ArrowUpRight aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => leaveOpening('work')}
          className="cinematic-aperture__quiet-action"
        >
          VIEW SELECTED WORK
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {frameOpen
          ? '전체 2.39대 1 프레임이 열렸습니다.'
          : '영상이 VIO KIM 글자 안에서 재생됩니다. 길게 눌러 전체 프레임을 여세요.'}
      </p>
    </section>
  );
}
