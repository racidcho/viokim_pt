import { heroConfig, navigationConfig } from '../config';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-black">
      <div className="absolute inset-0 hero-still-push">
        <img
          src={heroConfig.backgroundImage}
          alt="영화 미아의 밤거리 스틸"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-4 py-8 sm:px-8">
        <div className="controlled-panel panel-enter flex h-[74svh] min-h-[540px] w-full max-w-[1080px] flex-col bg-[#ecebe6] text-black shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
          <div className="flex items-center justify-between gap-5 border-b border-black/15 px-5 py-5 sm:px-8">
            <a
              href="#hero"
              className="text-sm font-semibold tracking-[-0.03em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
            >
              VIO KIM
            </a>
            <nav aria-label="주요 메뉴" className="hidden items-center gap-7 md:flex">
              {navigationConfig.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[12px] font-medium tracking-[0.08em] text-black/70 transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <span className="font-mono text-[10px] tracking-[0.2em] text-black/50 md:hidden">
              DOP · SEOUL
            </span>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center px-5 text-center sm:px-8">
            <p className="mb-5 font-mono text-[10px] tracking-[0.36em] text-black/55 sm:text-xs">
              DIRECTOR OF PHOTOGRAPHY · SEOUL
            </p>
            <h1 className="flex max-w-full items-center justify-center whitespace-nowrap text-[18vw] font-bold leading-[0.82] tracking-[-0.09em] sm:text-[14vw] lg:text-[176px]">
              <span>VIO</span>
              <span className="ml-[0.08em] bg-highlight px-[0.1em] pb-[0.08em] text-black">
                KIM
              </span>
            </h1>
            <p className="mt-8 max-w-[560px] text-balance text-base font-medium leading-relaxed text-black/65 sm:text-lg">
              빛과 어둠 사이, 프레임 안의 이야기.
            </p>
          </div>

          <div className="grid grid-cols-[1fr_auto] items-end gap-5 border-t border-black/15 px-5 py-5 sm:grid-cols-3 sm:px-8">
            <p className="font-mono text-[10px] leading-relaxed tracking-[0.18em] text-black/55">
              FEATURE · SHORT · DOCUMENTARY
            </p>
            <a
              href="#about"
              className="hidden text-center font-mono text-[10px] tracking-[0.2em] text-black/55 transition-colors hover:text-black sm:block"
            >
              SCROLL TO ENTER ↓
            </a>
            <p className="text-right font-mono text-[10px] tracking-[0.18em] text-black/55">
              © 2026
            </p>
          </div>
        </div>
      </div>

      <p className="absolute bottom-3 left-4 z-10 hidden font-mono text-[9px] tracking-[0.22em] text-white/55 lg:block">
        SELECTED FRAME · {heroConfig.copyright}
      </p>
    </section>
  );
}
