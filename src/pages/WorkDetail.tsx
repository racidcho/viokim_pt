import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router';
import gsap from 'gsap';
import { ArrowLeft, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { works } from '../works-data';
import { GradeSlider } from '../components/GradeSlider';
import { TimecodeGallery } from '../components/TimecodeGallery';
import { useSlateNavigate } from '../components/Slate';

export default function WorkDetail() {
  const playSlate = useSlateNavigate();
  const { slug } = useParams<{ slug: string }>();
  const work = works.find((w) => w.slug === slug);
  const heroRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (heroRef.current) {
      // 시그니처 '느린 푸쉬인' — 히어로 스틸이 천천히 줌인
      gsap.fromTo(
        heroRef.current,
        { scale: 1 },
        { scale: 1.12, duration: 14, ease: 'none' }
      );
    }
  }, [slug]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null || !work) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight')
        setLightbox((i) => (i === null ? null : (i + 1) % work.stills.length));
      if (e.key === 'ArrowLeft')
        setLightbox((i) =>
          i === null ? null : (i - 1 + work.stills.length) % work.stills.length
        );
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, work]);

  if (!work) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
        <p className="text-white/60">작품을 찾을 수 없습니다.</p>
        <Link to="/" className="text-highlight hover:underline">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

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
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 lg:px-16 py-5 bg-gradient-to-b from-black/80 to-transparent">
        <Link
          to="/"
          className="flex items-center gap-2 text-white/70 hover:text-highlight transition-colors text-sm tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> WORKS
        </Link>
        <span className="text-white/40 text-sm tracking-widest hidden sm:block">
          VIO KIM — CINEMATOGRAPHER
        </span>
      </header>

      {/* Hero — 2.39:1 레터박스 + 슬로우 줌인 */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden flex items-center">
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          <img
            src={work.stills[0]}
            alt={work.titleKo}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
        <div className="relative z-10 w-full px-6 lg:px-16 max-w-7xl mx-auto">
          <p className="text-highlight text-sm tracking-[0.3em] mb-4">
            {work.year} · {work.categoryLabel} · {work.runtime}
          </p>
          <h1 className="text-5xl md:text-8xl font-medium tracking-tight">
            {work.titleKo}
          </h1>
          <p className="text-xl md:text-3xl text-white/60 font-extralight tracking-widest mt-2">
            {work.titleEn}
          </p>
        </div>
      </section>

      {/* Meta strip */}
      <section className="border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <p className="text-white/40 tracking-widest mb-1">ROLE</p>
            <p>{work.role}</p>
          </div>
          <div>
            <p className="text-white/40 tracking-widest mb-1">DIRECTOR</p>
            <p>{work.director}</p>
          </div>
          <div>
            <p className="text-white/40 tracking-widest mb-1">GENRE</p>
            <p>{work.genre}</p>
          </div>
          <div>
            <p className="text-white/40 tracking-widest mb-1">FORMAT</p>
            <p>{work.format}</p>
          </div>
        </div>
        {work.note && (
          <div className="max-w-7xl mx-auto px-6 lg:px-16 pb-6">
            <span className="inline-block border border-highlight/60 text-highlight text-xs tracking-[0.2em] px-4 py-2">
              {work.note}
            </span>
          </div>
        )}
      </section>

      {/* Production specs */}
      {work.specs.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-16 pt-14">
          <h2 className="text-sm tracking-[0.3em] text-white/40 mb-8">
            PRODUCTION SPECS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8">
            {work.specs.map((s) => (
              <div key={s.label}>
                <p className="text-highlight text-xs tracking-[0.25em] mb-2">
                  {s.label}
                </p>
                <p className="text-white/85 font-light">{s.value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Video — 추후 video 필드에 URL 추가 시 자동 임베드 */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        {work.video ? (
          <div className="aspect-[2.39/1] w-full bg-black">
            <iframe
              src={videoEmbed(work.video)}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={work.titleKo}
            />
          </div>
        ) : (
          <div className="relative aspect-[2.39/1] w-full overflow-hidden group cursor-default">
            <img
              src={work.stills[1] ?? work.stills[0]}
              alt=""
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center">
                <Play className="w-6 h-6 text-white/60 ml-1" />
              </div>
              <p className="text-white/50 tracking-[0.3em] text-sm">
                FILM COMING SOON
              </p>
            </div>
          </div>
        )}
      </section>

      {/* LOOK — LOG vs GRADE 비교 */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 pb-16">
        <h2 className="text-sm tracking-[0.3em] text-white/40 mb-3">
          LOOK — LOG vs GRADE
        </h2>
        <p className="text-white/50 text-sm font-light mb-8">
          슬라이더를 드래그해 촬영 원본(LOG)과 최종 그레이딩을 비교해 보세요.
        </p>
        <GradeSlider
          src={work.stills[1] ?? work.stills[0]}
          alt={`${work.titleKo} 그레이딩 비교`}
        />
      </section>

      {/* Synopsis & Intent */}
      {(work.synopsis || work.intent) && (
        <section className="max-w-7xl mx-auto px-6 lg:px-16 pb-16 grid md:grid-cols-2 gap-12">
          {work.synopsis && (
            <div>
              <h2 className="text-highlight text-sm tracking-[0.3em] mb-6">
                SYNOPSIS
              </h2>
              <p className="text-white/80 leading-relaxed text-lg font-light">
                {work.synopsis}
              </p>
            </div>
          )}
          {work.intent && (
            <div>
              <h2 className="text-[#c13a6b] text-sm tracking-[0.3em] mb-6">
                CINEMATOGRAPHY NOTE
              </h2>
              <p className="text-white/80 leading-relaxed text-lg font-light">
                {work.intent}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Quote */}
      {work.quote && (
        <section className="max-w-5xl mx-auto px-6 lg:px-16 pb-20">
          <blockquote className="border-l-2 border-highlight pl-8">
            <p className="text-xl md:text-2xl font-extralight leading-relaxed text-white/90 italic">
              “{work.quote}”
            </p>
            <cite className="block mt-4 text-white/50 text-sm tracking-widest not-italic">
              — {work.quoteSource}
            </cite>
          </blockquote>
        </section>
      )}

      {/* Stills — 타임코드 스크럽 갤러리 */}
      <div className="pb-10">
        <TimecodeGallery
          stills={work.stills}
          title={work.titleEn}
          onSelect={(i) => setLightbox(i)}
        />
      </div>

      {/* Awards & Invitations & Credits */}
      <section className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 grid md:grid-cols-3 gap-12">
          <div>
            <h2 className="text-sm tracking-[0.3em] text-white/40 mb-6">
              AWARDS
            </h2>
            {work.awards.length > 0 ? (
              <ul className="space-y-3">
                {work.awards.map((f) => (
                  <li key={f} className="text-white/85 font-light">
                    {f}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/30 font-light">—</p>
            )}
          </div>
          <div>
            <h2 className="text-sm tracking-[0.3em] text-white/40 mb-6">
              FESTIVALS
            </h2>
            {work.invitations.length > 0 ? (
              <ul className="space-y-3">
                {work.invitations.map((f) => (
                  <li key={f} className="text-white/85 font-light">
                    {f}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/30 font-light">—</p>
            )}
          </div>
          <div>
            <h2 className="text-sm tracking-[0.3em] text-white/40 mb-6">
              CREDITS
            </h2>
            <ul className="space-y-3">
              {work.credits.map((c) => (
                <li
                  key={c.role}
                  className="flex justify-between max-w-sm text-white/85 font-light"
                >
                  <span className="text-white/40 shrink-0 mr-6">{c.role}</span>
                  <span>{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Next work */}
      {(() => {
        const idx = works.findIndex((w) => w.slug === slug);
        const next = works[(idx + 1) % works.length];
        return (
          <button
            onClick={() =>
              playSlate(`/work/${next.slug}`, {
                scene: `SCENE ${String(idx + 2).padStart(2, '0')}`,
                title: next.titleKo,
                subtitle: next.titleEn,
              })
            }
            className="block w-full text-left border-t border-white/10 group cursor-pointer"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-16 py-14 flex items-center justify-between">
              <div>
                <p className="text-white/40 text-sm tracking-[0.3em] mb-2">
                  NEXT WORK
                </p>
                <p className="text-3xl md:text-5xl font-medium group-hover:text-highlight transition-colors">
                  {next.titleKo}
                </p>
              </div>
              <ChevronRight className="w-8 h-8 text-white/40 group-hover:text-highlight group-hover:translate-x-2 transition-all" />
            </div>
          </button>
        );
      })()}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white"
            onClick={() => setLightbox(null)}
            aria-label="닫기"
          >
            <X className="w-7 h-7" />
          </button>
          <button
            className="absolute left-4 md:left-10 text-white/60 hover:text-highlight"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(
                (lightbox - 1 + work.stills.length) % work.stills.length
              );
            }}
            aria-label="이전"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <img
            src={work.stills[lightbox]}
            alt=""
            className="max-w-[92vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 md:right-10 text-white/60 hover:text-highlight"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % work.stills.length);
            }}
            aria-label="다음"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm tracking-widest">
            {lightbox + 1} / {work.stills.length}
          </span>
        </div>
      )}
    </div>
  );
}
