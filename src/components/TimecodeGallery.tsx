import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FPS = 24;
const FRAMES_PER_STILL = 48; // 스틸 1장 = 2초

function toTimecode(frames: number) {
  const f = Math.floor(frames % FPS);
  const totalSec = Math.floor(frames / FPS);
  const s = totalSec % 60;
  const m = Math.floor(totalSec / 60) % 60;
  const h = Math.floor(totalSec / 3600);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(h)}:${p(m)}:${p(s)}:${p(f)}`;
}

/** 필름 스프로켓 홀 스트립 */
function Sprockets() {
  return (
    <div className="flex gap-3 px-2">
      {Array.from({ length: 60 }).map((_, i) => (
        <span key={i} className="w-3 h-2 rounded-[2px] bg-white/15 shrink-0" />
      ))}
    </div>
  );
}

/**
 * 타임코드 스크럽 갤러리
 * 데스크톱: 세로 스크롤이 가로 필름 스트립을 스크럽 (GSAP pin)
 * 모바일: 네이티브 가로 스와이프 (scroll-snap)
 * 두 모드 모두 진행률에 따라 타임코드가 돌아간다.
 */
export function TimecodeGallery({
  stills,
  title,
  onSelect,
}: {
  stills: string[];
  title: string;
  onSelect: (index: number) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const totalFrames = stills.length * FRAMES_PER_STILL;

  // 데스크톱: pinned horizontal scrub
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, [stills.length]);

  // 모바일: 네이티브 스크롤 진행률
  const onMobileScroll = () => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const tc = toTimecode(progress * totalFrames);

  const TimecodeBadge = () => (
    <div className="flex items-center gap-3 bg-black/70 backdrop-blur-sm border border-white/10 px-4 py-2">
      <span className="w-2 h-2 rounded-full bg-[#ea3c3c] animate-pulse" />
      <span className="font-mono text-highlight text-sm tracking-[0.2em] tabular-nums">
        TC {tc}
      </span>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black">
      {/* 헤더 */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-20 pb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-sm tracking-[0.3em] text-white/40 mb-2">
            STILLS — SCROLL TO SCRUB
          </h2>
          <p className="text-white/25 text-xs tracking-widest font-mono">
            {title} · {stills.length} CUTS · 24 FPS
          </p>
        </div>
        <div className="hidden md:block">
          <TimecodeBadge />
        </div>
      </div>

      {/* 데스크톱 스크럽 트랙 */}
      <div className="hidden md:block relative h-[62vh]">
        <div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex items-center gap-[5vw] px-[10vw] will-change-transform"
        >
          {stills.map((src, i) => (
            <button
              key={src}
              onClick={() => onSelect(i)}
              className="relative shrink-0 w-[62vw] max-w-[1100px] group"
            >
              <div className="absolute -top-6 left-0 right-0 overflow-hidden opacity-70">
                <Sprockets />
              </div>
              <div className="aspect-[2.39/1] overflow-hidden bg-[#0d1112]">
                <img
                  src={src}
                  alt={`${title} 스틸 ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                />
              </div>
              <div className="absolute -bottom-6 left-0 right-0 overflow-hidden opacity-70">
                <Sprockets />
              </div>
              <span className="absolute bottom-2 right-3 font-mono text-[10px] text-white/50 tracking-widest">
                CUT {String(i + 1).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 모바일 스와이프 트랙 */}
      <div className="md:hidden">
        <div
          ref={mobileTrackRef}
          onScroll={onMobileScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4 hide-scrollbar"
        >
          {stills.map((src, i) => (
            <button
              key={src}
              onClick={() => onSelect(i)}
              className="snap-center shrink-0 w-[85vw]"
            >
              <div className="aspect-[2.39/1] overflow-hidden bg-[#0d1112]">
                <img
                  src={src}
                  alt={`${title} 스틸 ${i + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              <p className="mt-2 text-left font-mono text-[10px] text-white/40 tracking-widest">
                CUT {String(i + 1).padStart(2, '0')}
              </p>
            </button>
          ))}
        </div>
        <div className="px-6 pb-6">
          <TimecodeBadge />
        </div>
      </div>
    </section>
  );
}
