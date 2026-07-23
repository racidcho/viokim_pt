import { ArrowUp } from 'lucide-react';
import { footerConfig } from '../config';

const navLinks = [
  { label: 'Works', href: '#works' },
  { label: 'About', href: '#about' },
  { label: 'Filmography', href: '#filmography' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/15 bg-black px-5 pb-10 pt-16 text-white sm:px-8 lg:pt-24">
      <div className="mx-auto max-w-7xl">
        <p className="english-display text-[clamp(3.4rem,9vw,9rem)] leading-[0.82] tracking-[-0.075em]">
          EVERY FRAME
          <br />
          <span className="text-highlight">TELLS A STORY.</span>
        </p>

        <div className="mt-16 grid gap-10 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="하단 메뉴" className="flex flex-col items-start gap-3">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-white/55 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col items-start gap-3 text-sm">
            <a href="mailto:viokimfilm@gmail.com" className="text-white/55 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight">
              viokimfilm@gmail.com
            </a>
            <a href="tel:+821063043381" className="text-white/55 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight">
              +82 10 6304 3381
            </a>
          </div>
          <div className="font-mono text-[10px] leading-relaxed tracking-[0.18em] text-white/35">
            DIRECTOR OF PHOTOGRAPHY
            <br />
            SEOUL, SOUTH KOREA
          </div>
          <a href="#hero" className="flex h-12 w-12 items-center justify-center border border-white/25 text-white/70 transition-colors hover:border-highlight hover:text-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight lg:justify-self-end" aria-label="페이지 맨 위로">
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-5 font-mono text-[9px] tracking-[0.15em] text-white/30 sm:flex-row sm:justify-between">
          <span>{footerConfig.copyright}</span>
          <span>{footerConfig.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
