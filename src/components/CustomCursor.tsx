import { useEffect, useRef, useState } from 'react';

// ============================================================================
// 뷰파인더 커서 — 코너 브래킷 포커스 박스 + 뷰파인더 정보 텍스트 (ISO / T / K)
// Hover(a, button, [data-hover], [data-cursor]): 브래킷 수축 + 포커스 락 플래시
//   + ● REC 인디케이터 + AF LOCK 리드아웃
// ============================================================================

const isInteractive = (target: HTMLElement) =>
  target.tagName === 'A' ||
  target.tagName === 'BUTTON' ||
  !!target.closest('a') ||
  !!target.closest('button') ||
  target.dataset.hover === 'true' ||
  !!target.closest('[data-hover="true"]') ||
  !!target.closest('[data-cursor]');

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // 터치 디바이스에서는 렌더링하지 않음
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(reduced);
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isInteractive(target)) setIsHovering(true);
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isInteractive(target)) setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (!isVisible) return null;

  const boxSize = isHovering ? 30 : 46;
  const bracketLen = isHovering ? 9 : 12;
  const transition = reducedMotion
    ? 'none'
    : 'width 0.18s cubic-bezier(0.16, 1, 0.3, 1), height 0.18s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease-out';

  // 코너 브래킷 4개 (border 두 면씩)
  const corner = (pos: string): React.CSSProperties => ({
    position: 'absolute',
    width: bracketLen,
    height: bracketLen,
    transition: reducedMotion
      ? 'none'
      : 'width 0.18s cubic-bezier(0.16, 1, 0.3, 1), height 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
    ...Object.fromEntries(pos.split(' ').map((p) => [p, 0])),
  });

  const borderStyle = '1.5px solid rgba(53, 201, 184, 0.9)';

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-screen"
      style={{ willChange: 'transform' }}
    >
      {/* REC 인디케이터 — 호버 시에만 */}
      {isHovering && (
        <div
          className="absolute flex items-center gap-1"
          style={{ top: -boxSize / 2 - 14, left: -boxSize / 2 }}
        >
          <span
            className={reducedMotion ? '' : 'animate-pulse'}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#ff3b30',
              boxShadow: '0 0 6px rgba(255, 59, 48, 0.8)',
            }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: 8,
              letterSpacing: '0.15em',
              color: '#ff3b30',
            }}
          >
            REC
          </span>
        </div>
      )}

      {/* 포커스 박스 — 코너 브래킷 4개 */}
      <div
        className="absolute"
        style={{
          width: boxSize,
          height: boxSize,
          left: -boxSize / 2,
          top: -boxSize / 2,
          transition,
          opacity: 1,
          animation:
            !reducedMotion && isHovering
              ? 'af-lock-flash 0.28s ease-out'
              : 'none',
        }}
      >
        <span
          style={{
            ...corner('top left'),
            borderTop: borderStyle,
            borderLeft: borderStyle,
          }}
        />
        <span
          style={{
            ...corner('top right'),
            borderTop: borderStyle,
            borderRight: borderStyle,
          }}
        />
        <span
          style={{
            ...corner('bottom left'),
            borderBottom: borderStyle,
            borderLeft: borderStyle,
          }}
        />
        <span
          style={{
            ...corner('bottom right'),
            borderBottom: borderStyle,
            borderRight: borderStyle,
          }}
        />
        {/* 중앙 포커스 포인트 */}
        <span
          className="absolute rounded-full"
          style={{
            width: 2,
            height: 2,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(53, 201, 184, 0.9)',
          }}
        />
      </div>

      {/* AF LOCK 리드아웃 — 호버 시에만 */}
      {isHovering && (
        <div
          className="absolute font-mono whitespace-nowrap"
          style={{
            top: -boxSize / 2 - 14,
            left: boxSize / 2 + 8,
            fontSize: 8,
            letterSpacing: '0.15em',
            color: 'rgba(53, 201, 184, 0.85)',
          }}
        >
          AF LOCK
        </div>
      )}

      {/* 뷰파인더 정보 텍스트 — 박스 하단 */}
      <div
        className="absolute font-mono whitespace-nowrap"
        style={{
          top: boxSize / 2 + 8,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 8,
          letterSpacing: '0.12em',
          color: 'rgba(53, 201, 184, 0.45)',
          transition: reducedMotion ? 'none' : 'top 0.18s ease-out',
        }}
      >
        ISO 800&nbsp;&nbsp;T1.8&nbsp;&nbsp;5600K
      </div>
    </div>
  );
}
