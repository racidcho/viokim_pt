import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { useSlateNavigate } from './Slate';
import { featuredWorks } from '../works-data';

// ============================================================================
// WorksSlider — 풀스크린 작품 슬라이더 (jasonbergh.com 벤치마크)
// 데스크톱: 휠 제스처 상태 머신 — 스테이지가 뷰포트를 채우면 휠을 가로채
//   작품을 전환하고, 첫/마지막 작품을 넘어서는 스크롤은 페이지 흐름에 반환.
// 모바일(coarse pointer): 수직 스냅 스와이프 (휠 가로채기 없음).
// ============================================================================

const works = featuredWorks;
const TOTAL = works.length;
const pad = (n: number) => String(n).padStart(2, '0');

interface SlideFrameProps {
  index: number;
  onView: () => void;
}

/** 슬라이드 본문 콘텐츠 — 배경 이미지 위 프레임/타이포 레이어 */
function SlideFrame({ index, onView }: SlideFrameProps) {
  const w = works[index];
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* 중앙 프레임 코너 브래킷 */}
      <div className="pointer-events-none absolute inset-[7%] md:inset-[9%]">
        <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/50" />
        <span className="absolute top-0 right-0 w-5 h-5 border-t border-r border-white/50" />
        <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-white/50" />
        <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/50" />
      </div>

      {/* 상단: 카테고리 + 포맷 (프레임 상단 모서리 라인) */}
      <div className="slide-meta relative z-10 flex justify-between px-[9%] md:px-[11%] pt-[10%] md:pt-[12%] font-mono text-[10px] md:text-[11px] tracking-[0.3em] text-white/60">
        <span className="text-highlight">{w.categoryLabel.toUpperCase()}</span>
        <span>{w.format.toUpperCase()}</span>
      </div>

      {/* 중앙: 타이틀 블록 */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-8">
        <p className="slide-meta font-mono text-[10px] md:text-xs tracking-[0.35em] text-white/50 mb-4 md:mb-6">
          {w.titleEn} · {w.year}
        </p>
        <button
          onClick={onView}
          data-cursor
          className="slide-title group cursor-pointer"
          aria-label={`${w.titleKo} 상세 보기`}
        >
          <span className="font-display-serif block text-white text-[15vw] md:text-[7.5vw] leading-none font-medium group-hover:text-highlight transition-colors duration-500">
            {w.titleKo}
          </span>
          <span className="font-display-serif italic block text-white/55 text-[6vw] md:text-[2.2vw] leading-tight mt-3 md:mt-4">
            {w.titleEn.charAt(0)}
            <span className="not-italic">{w.titleEn.slice(1)}</span>
          </span>
        </button>

        {/* VIEW FILM ↗ */}
        <button
          onClick={onView}
          data-cursor
          className="slide-meta mt-8 md:mt-10 flex items-center gap-2 font-mono text-[10px] md:text-[11px] tracking-[0.3em] text-white/70 border border-white/25 px-5 py-2.5 hover:border-highlight hover:text-highlight transition-colors duration-300 cursor-pointer"
        >
          VIEW FILM
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 하단: 연출/장르 + 인덱스 */}
      <div className="slide-meta relative z-10 flex justify-between items-end px-[9%] md:px-[11%] pb-[9%] md:pb-[11%] font-mono text-[10px] md:text-[11px] tracking-[0.25em] text-white/50">
        <span>
          DIR. {w.director} · {w.genre.toUpperCase()}
        </span>
        <span className="text-white/70">
          {pad(index + 1)} <span className="text-highlight">/</span> {pad(TOTAL)}
        </span>
      </div>

      {/* 좌우 프레임 카운터 (JB 스타일 "01." / ".06") */}
      <span className="slide-meta hidden md:block absolute left-[3.5%] top-1/2 -translate-y-1/2 font-mono text-xs tracking-[0.3em] text-white/45 z-10">
        {pad(index + 1)}.
      </span>
      <span className="slide-meta hidden md:block absolute right-[3.5%] top-1/2 -translate-y-1/2 font-mono text-xs tracking-[0.3em] text-white/45 z-10">
        .{pad(TOTAL)}
      </span>
    </div>
  );
}

export function WorksSlider() {
  const playSlate = useSlateNavigate();
  const stageRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const frameWrapRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const lockRef = useRef(false);
  const pendingRef = useRef(0); // 전환 중 입력된 대기 방향 (1스텝 큐)
  const reducedRef = useRef(false);
  const [isMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches
  );
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reducedRef.current = window
      .matchMedia('(prefers-reduced-motion: reduce)')
      .matches;
  }, []);

  const goTo = useCallback(
    (next: number, dir: number) => {
      if (next < 0 || next >= TOTAL || next === indexRef.current) return;
      if (lockRef.current) {
        pendingRef.current = dir; // 전환 중 입력은 1스텝만 대기
        return;
      }

      const prev = indexRef.current;
      indexRef.current = next;
      setIndex(next);

      const prevLayer = layersRef.current[prev];
      const nextLayer = layersRef.current[next];
      if (!prevLayer || !nextLayer) return;

      if (reducedRef.current) {
        gsap.set(prevLayer, { opacity: 0 });
        gsap.set(nextLayer, { opacity: 1, scale: 1, y: 0 });
        return;
      }

      lockRef.current = true;
      const tl = gsap.timeline({
        onComplete: () => {
          lockRef.current = false;
          // 대기 중인 1스텝이 있으면 이어서 전환
          const pending = pendingRef.current;
          pendingRef.current = 0;
          if (pending !== 0) {
            goTo(indexRef.current + pending, pending);
          }
        },
      });
      tl.to(prevLayer, {
        opacity: 0,
        scale: 1.04,
        duration: 0.7,
        ease: 'power2.inOut',
      });
      tl.fromTo(
        nextLayer,
        { opacity: 0, scale: 1.08, y: 24 * dir },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.45'
      );
      // 텍스트 블록 리셋 애니메이션
      if (frameWrapRef.current) {
        const items = frameWrapRef.current.querySelectorAll(
          '.slide-title, .slide-meta'
        );
        tl.fromTo(
          items,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.6'
        );
      }
    },
    []
  );

  const navigate = useCallback(
    (i: number) => {
      const w = works[i];
      playSlate(`/work/${w.slug}`, {
        scene: `SCENE ${pad(i + 1)}`,
        title: w.titleKo,
        subtitle: `${w.titleEn} · ${w.year}`,
      });
    },
    [playSlate]
  );

  // 데스크톱 휠 제스처 — 스테이지가 뷰포트를 채울 때만 가로챔
  useEffect(() => {
    if (isMobile) return;
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const dy = e.deltaY;
      if (Math.abs(dy) < 10) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const engaged = rect.top > -vh * 0.15 && rect.bottom < vh * 1.15;
      if (!engaged) return; // 스테이지가 화면을 채우지 않으면 페이지 스크롤

      const dir = dy > 0 ? 1 : -1;
      const next = indexRef.current + dir;
      if (next < 0 || next >= TOTAL) return; // 양 끝에서는 페이지 스크롤로 반환

      e.preventDefault();
      goTo(next, dir);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [isMobile, goTo]);

  // 키보드 좌/우 화살표
  useEffect(() => {
    if (isMobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(indexRef.current + 1, 1);
      if (e.key === 'ArrowLeft') goTo(indexRef.current - 1, -1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobile, goTo]);

  // 초기 레이어 상태
  useEffect(() => {
    layersRef.current.forEach((layer, i) => {
      if (layer) gsap.set(layer, { opacity: i === 0 ? 1 : 0 });
    });
  }, []);

  // 모바일: 스냅 스크롤 인덱스 추적
  const onMobileScroll = () => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const i = Math.round(el.scrollTop / el.clientHeight);
    if (i !== indexRef.current && i >= 0 && i < TOTAL) {
      indexRef.current = i;
      setIndex(i);
    }
  };

  // ── 모바일: 수직 스냅 스와이프 ──
  if (isMobile) {
    return (
      <div
        ref={mobileScrollRef}
        onScroll={onMobileScroll}
        className="relative h-[100svh] w-full overflow-y-auto snap-y snap-mandatory hide-scrollbar"
      >
        {works.map((w, i) => (
          <div key={w.slug} className="relative h-full w-full snap-start">
            <div className="absolute inset-0">
              <img
                src={w.card}
                alt={w.titleKo}
                className="w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            </div>
            <SlideFrame index={i} onView={() => navigate(i)} />
          </div>
        ))}
      </div>
    );
  }

  // ── 데스크톱: 휠 전환 풀스크린 스테이지 ──
  return (
    <div
      ref={stageRef}
      className="relative h-screen w-full overflow-hidden select-none"
    >
      {/* 배경 레이어 스택 */}
      {works.map((w, i) => (
        <div
          key={w.slug}
          ref={(el) => {
            layersRef.current[i] = el;
          }}
          className="absolute inset-0"
          style={{ opacity: 0, willChange: 'transform, opacity' }}
        >
          <img
            src={w.card}
            alt={w.titleKo}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>
      ))}

      {/* 활성 슬라이드 프레임 */}
      <div ref={frameWrapRef} className="absolute inset-0 z-10">
        <SlideFrame
          key={index}
          index={index}
          onView={() => navigate(index)}
        />
      </div>
    </div>
  );
}
