import { useRef, useState, useCallback } from 'react';

/**
 * LOG → GRADE 비포/애프터 슬라이더
 * 원본 스틸 위에 CSS 필터로 만든 LOG(플랫) 룩 레이어를 얹고
 * 드래그로 그레이딩 전후를 비교한다.
 */
export function GradeSlider({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    update(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) update(e.clientX);
  };
  const stop = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[2.39/1] w-full overflow-hidden select-none cursor-ew-resize touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerLeave={stop}
    >
      {/* GRADE (최종 그레이딩) — 바닥 레이어 */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <span className="absolute bottom-3 right-4 text-[10px] tracking-[0.3em] text-highlight bg-black/50 px-2 py-1">
        GRADE
      </span>

      {/* LOG (촬영 원본 룩) — 상단 레이어, 우측이 잘려나감 */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter:
              'saturate(0.35) contrast(0.82) brightness(1.12) sepia(0.08)',
          }}
          draggable={false}
        />
        <span className="absolute bottom-3 left-4 text-[10px] tracking-[0.3em] text-white/70 bg-black/50 px-2 py-1">
          LOG
        </span>
      </div>

      {/* 디바이더 */}
      <div
        className="absolute top-0 bottom-0 w-px bg-highlight z-10"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-highlight bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <span className="text-highlight text-xs tracking-tighter">◂ ▸</span>
        </div>
      </div>
    </div>
  );
}
