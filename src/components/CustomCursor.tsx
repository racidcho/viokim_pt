import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    const onMove = (event: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      const target = event.target as HTMLElement;
      setVisible(Boolean(target.closest('[data-cursor]')));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[100] -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-highlight bg-black/55 font-mono text-[8px] tracking-[0.12em] text-highlight backdrop-blur-sm transition-opacity duration-150 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      VIEW
    </div>
  );
}
