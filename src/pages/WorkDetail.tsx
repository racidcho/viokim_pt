import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { works } from '../works-data';
import { useSlateNavigate } from '../components/Slate';

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const work = works.find((item) => item.slug === slug);
  const playSlate = useSlateNavigate();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  useEffect(() => {
    if (lightbox !== null) closeButtonRef.current?.focus();
  }, [lightbox]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (lightbox === null || !work) return;
      if (event.key === 'Escape') setLightbox(null);
      if (event.key === 'ArrowRight') {
        setLightbox((lightbox + 1) % work.stills.length);
      }
      if (event.key === 'ArrowLeft') {
        setLightbox((lightbox - 1 + work.stills.length) % work.stills.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox, work]);

  if (!work) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black text-white">
        <p className="text-white/55">작품을 찾을 수 없습니다.</p>
        <Link to="/#works" className="text-highlight underline underline-offset-4">
          작품 목록으로 돌아가기
        </Link>
      </main>
    );
  }

  const verifiedSpecs = work.specs.filter(
    (spec) => spec.value.trim() && !spec.value.includes('확인 필요')
  );
  const currentIndex = works.findIndex((item) => item.slug === work.slug);
  const next = works[(currentIndex + 1) % works.length];
  const ratioMatch = work.format.match(/([\d.]+)\s*:\s*([\d.]+)/);
  const heroAspectRatio = ratioMatch ? `${ratioMatch[1]} / ${ratioMatch[2]}` : '16 / 9';

  const videoEmbed = (url: string) => {
    if (url.includes('vimeo.com')) {
      const id = url.split('vimeo.com/')[1]?.split(/[?/]/)[0];
      return `https://player.vimeo.com/video/${id}`;
    }
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const id = url.includes('youtu.be')
        ? url.split('youtu.be/')[1]?.split(/[?/]/)[0]
        : new URLSearchParams(url.split('?')[1]).get('v');
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-black/80 px-5 py-4 backdrop-blur-md sm:px-8 lg:px-12">
        <Link
          to="/#works"
          className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-white/65 transition-colors hover:text-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
        >
          <ArrowLeft className="h-4 w-4" /> WORKS
        </Link>
        <span className="hidden font-mono text-[9px] tracking-[0.2em] text-white/35 sm:block">
          VIO KIM · DIRECTOR OF PHOTOGRAPHY
        </span>
      </header>

      <section className="relative overflow-hidden pt-16">
        <div
          className="relative mx-auto flex w-full max-w-[1600px] items-center justify-center overflow-hidden bg-[#070909]"
          style={{ aspectRatio: heroAspectRatio }}
        >
          <img
            src={work.stills[0]}
            alt={`${work.titleKo} 대표 스틸`}
            className="h-full w-full object-contain"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" aria-hidden="true" />
        </div>

        <div className="controlled-panel panel-enter relative z-10 mx-4 bg-[#ecebe6] text-black shadow-[0_24px_80px_rgba(0,0,0,0.38)] sm:mx-8 lg:mx-auto lg:-mt-12 lg:max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/15 px-5 py-4 font-mono text-[9px] tracking-[0.2em] text-black/45 sm:px-8">
            <span>{String(currentIndex + 1).padStart(2, '0')} · {work.categoryLabel.toUpperCase()}</span>
            <span>{work.year} · {work.format}</span>
          </div>
          <div className="grid gap-8 px-5 py-7 sm:px-8 sm:py-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-14 lg:px-10 lg:py-9">
            <div>
              <h1 className="text-[clamp(3.1rem,6vw,5.5rem)] font-semibold leading-[0.84] tracking-[-0.07em]">
                {work.titleKo}
              </h1>
              <p className="english-display mt-4 text-xl font-medium tracking-[-0.035em] text-black/50 sm:text-2xl">
                {work.titleEn}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-black/15 pt-5 font-mono text-[9px] tracking-[0.13em] text-black/55 sm:grid-cols-4 lg:border-t-0 lg:pt-0">
              <span>ROLE<br /><strong className="mt-1 block font-medium text-black">{work.role}</strong></span>
              <span>DIRECTOR<br /><strong className="mt-1 block font-medium text-black">{work.director}</strong></span>
              <span>GENRE<br /><strong className="mt-1 block font-medium text-black">{work.genre}</strong></span>
              <span>RUNTIME<br /><strong className="mt-1 block font-medium text-black">{work.runtime}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {work.note && (
        <div className="mx-auto max-w-7xl px-5 pt-12 sm:px-8">
          <span className="inline-block border border-highlight/70 px-4 py-2 font-mono text-[9px] tracking-[0.2em] text-highlight">
            {work.note}
          </span>
        </div>
      )}

      {(work.synopsis || work.intent) && (
        <section className="mx-auto grid max-w-7xl gap-px bg-white/15 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
          {work.synopsis && (
            <article className="bg-black p-7 sm:p-10">
              <p className="mb-7 font-mono text-[10px] tracking-[0.25em] text-highlight">SYNOPSIS</p>
              <p className="text-lg font-light leading-relaxed text-white/75 sm:text-xl">{work.synopsis}</p>
            </article>
          )}
          {work.intent && (
            <article className="bg-[#ecebe6] p-7 text-black sm:p-10">
              <p className="mb-7 font-mono text-[10px] tracking-[0.25em] text-black/45">CINEMATOGRAPHY NOTE</p>
              <p className="text-lg font-light leading-relaxed text-black/70 sm:text-xl">{work.intent}</p>
            </article>
          )}
        </section>
      )}

      {verifiedSpecs.length > 0 && (
        <section className="mx-auto max-w-7xl border-y border-white/15 px-5 py-10 sm:px-8">
          <p className="mb-8 font-mono text-[10px] tracking-[0.25em] text-white/35">VERIFIED PRODUCTION SPECS</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-7 md:grid-cols-3 lg:grid-cols-4">
            {verifiedSpecs.map((spec) => (
              <div key={spec.label}>
                <p className="font-mono text-[9px] tracking-[0.2em] text-highlight">{spec.label}</p>
                <p className="mt-2 text-sm text-white/75">{spec.value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {work.video && (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="mb-6 font-mono text-[10px] tracking-[0.25em] text-white/35">FILM</p>
          <div className="aspect-video bg-[#0b0f10]">
            <iframe src={videoEmbed(work.video)} className="h-full w-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title={`${work.titleKo} 영상`} />
          </div>
        </section>
      )}

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-5 font-mono text-[10px] tracking-[0.25em] text-white/35">FRAME STUDY</p>
              <h2 className="english-display text-[clamp(4.2rem,9vw,8rem)] leading-[0.8] tracking-[-0.075em]">
                SELECTED <span className="text-highlight">CUTS</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/45">영상 대신 장면의 빛, 구도, 색을 스틸의 원래 비율로 살펴봅니다.</p>
          </div>

          <div className="grid items-start gap-x-5 gap-y-14 md:grid-cols-12">
            {work.stills.map((still, index) => {
              const layout = index % 4;
              const columnClass = layout === 0 || layout === 3 ? 'md:col-span-8' : 'md:col-span-4';
              return (
                <figure key={still} className={columnClass}>
                  <button
                    type="button"
                    onClick={() => setLightbox(index)}
                    data-cursor
                    className="group block w-full bg-[#0b0f10] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
                    aria-label={`${work.titleKo} 스틸 ${index + 1} 확대`}
                  >
                    <img src={still} alt={`${work.titleKo} 스틸 ${index + 1}`} className="h-auto w-full object-contain transition-opacity group-hover:opacity-80" loading={index < 2 ? 'eager' : 'lazy'} />
                  </button>
                  <figcaption className="mt-3 flex justify-between font-mono text-[9px] tracking-[0.17em] text-white/35">
                    <span>CUT {String(index + 1).padStart(2, '0')}</span>
                    <span>{work.format}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {work.quote && (
        <section className="bg-[#ecebe6] px-6 py-16 text-black sm:px-8 lg:py-20">
          <blockquote className="mx-auto max-w-[800px]">
            <p className="font-sans text-[clamp(1.75rem,3vw,2.75rem)] font-normal leading-[1.44] tracking-[-0.012em]">“{work.quote}”</p>
            <cite className="mt-6 block font-mono text-[10px] tracking-[0.12em] text-black/45 not-italic">— {work.quoteSource}</cite>
          </blockquote>
        </section>
      )}

      <section className="border-t border-white/15 px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
          <DetailList title="AWARDS" items={work.awards} />
          <DetailList title="FESTIVALS" items={work.invitations} />
          <div>
            <h2 className="mb-6 font-mono text-[10px] tracking-[0.25em] text-white/35">CREDITS</h2>
            <ul className="space-y-3">
              {work.credits.map((credit) => (
                <li key={`${credit.role}-${credit.name}`} className="flex justify-between gap-5 border-b border-white/10 pb-3 text-sm">
                  <span className="text-white/35">{credit.role}</span>
                  <span className="text-right text-white/75">{credit.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={() => playSlate(`/work/${next.slug}`, { scene: `SCENE ${String(currentIndex + 2).padStart(2, '0')}`, title: next.titleKo, subtitle: `${next.titleEn} · ${next.year}` })}
        className="group block w-full border-t border-white/15 px-5 py-14 text-left transition-colors hover:bg-[#ecebe6] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-highlight sm:px-8 lg:py-20"
      >
        <span className="mx-auto flex max-w-7xl items-end justify-between gap-8">
          <span>
            <span className="mb-3 block font-mono text-[10px] tracking-[0.25em] text-white/35 group-hover:text-black/45">NEXT WORK</span>
            <span className="block text-[clamp(2.5rem,6vw,6rem)] font-medium leading-none tracking-[-0.055em]">{next.titleKo}</span>
          </span>
          <ArrowUpRight className="h-7 w-7 shrink-0 text-highlight transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </button>

      {lightbox !== null && (
        <div role="dialog" aria-modal="true" aria-label={`${work.titleKo} 스틸 확대 보기`} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-10" onMouseDown={(event) => { if (event.currentTarget === event.target) setLightbox(null); }}>
          <button ref={closeButtonRef} type="button" onClick={() => setLightbox(null)} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/25 text-white/65 hover:border-highlight hover:text-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight sm:right-8 sm:top-8" aria-label="확대 보기 닫기">
            <X className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => setLightbox((lightbox - 1 + work.stills.length) % work.stills.length)} className="absolute left-3 flex h-11 w-11 items-center justify-center bg-black/70 text-white/65 hover:text-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-highlight sm:left-8" aria-label="이전 스틸">
            <ChevronLeft className="h-7 w-7" />
          </button>
          <img src={work.stills[lightbox]} alt={`${work.titleKo} 스틸 ${lightbox + 1} 확대`} className="max-h-[82vh] max-w-[92vw] object-contain" />
          <button type="button" onClick={() => setLightbox((lightbox + 1) % work.stills.length)} className="absolute right-3 flex h-11 w-11 items-center justify-center bg-black/70 text-white/65 hover:text-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-highlight sm:right-8" aria-label="다음 스틸">
            <ChevronRight className="h-7 w-7" />
          </button>
          <span className="absolute bottom-5 font-mono text-[9px] tracking-[0.2em] text-white/40">CUT {String(lightbox + 1).padStart(2, '0')} / {String(work.stills.length).padStart(2, '0')}</span>
        </div>
      )}
    </main>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="mb-6 font-mono text-[10px] tracking-[0.25em] text-white/35">{title}</h2>
      {items.length ? (
        <ul className="space-y-3 text-sm leading-relaxed text-white/75">
          {items.map((item) => <li key={item} className="border-b border-white/10 pb-3">{item}</li>)}
        </ul>
      ) : (
        <p className="text-sm text-white/25">—</p>
      )}
    </div>
  );
}
