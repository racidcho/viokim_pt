import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationConfig } from '../config';

const NAV_TRIGGER_LINE = 72;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.querySelector<HTMLElement>('#hero');
      setScrolled(
        hero
          ? hero.getBoundingClientRect().bottom <= NAV_TRIGGER_LINE
          : window.scrollY > window.innerHeight
      );
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-500 ease-out motion-reduce:transition-none ${
          solid
            ? 'border-black/15 bg-[#ecebe6] text-black'
            : 'border-transparent bg-transparent text-white'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-7">
          <a
            href="#hero"
            className="text-xl font-semibold tracking-[-0.04em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
          >
            VIO <span className="bg-highlight px-1 text-black">KIM</span>
          </a>

          <nav aria-label="고정 메뉴" className="hidden items-center gap-8 lg:flex">
            {navigationConfig.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-[11px] font-medium tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight ${
                  solid ? 'text-black/60 hover:text-black' : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[#ecebe6] px-6 pt-28 text-black transition-[opacity,transform] lg:hidden ${
          open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
        style={{ transitionDuration: '420ms' }}
      >
        <nav aria-label="모바일 메뉴" className="flex flex-col border-t border-black/15">
          {navigationConfig.items.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-black/15 py-5 text-3xl font-medium tracking-[-0.04em]"
            >
              {item.label}
              <span className="font-mono text-xs text-black/40">0{index + 1}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
