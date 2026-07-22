import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

// 모듈 레벨 플래그 — 같은 JS 세션(=SPA 납비게이션) 안에서만 스킵.
// 전체 페이지 로드/새로고침 시에는 항상 조명 인트로가 재생된다.
// (sessionStorage 기반 스킵은 탭 세션 동안 재방문 때마다 인트로를 막아
//  "인트로가 작동하지 않는다"고 인식되는 문제가 있어 폐기)
let heroLitThisSession = false;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const [, setLoaded] = useState(false);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  // 조명 켜기 인트로 — 페이지 로드마다 실행 (SPA 재진입 시에만 스킵)
  const [lightingPhase, setLightingPhase] = useState<'run' | 'done'>(() => {
    try {
      if (typeof window === 'undefined') return 'done';
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        return 'done';
    } catch {
      return 'done';
    }
    if (heroLitThisSession) return 'done';
    return 'run';
  });
  const [cueText, setCueText] = useState('STANDBY');
  const lightingRef = useRef<HTMLDivElement>(null);
  const keyLightRef = useRef<HTMLDivElement>(null);
  const fillLightRef = useRef<HTMLDivElement>(null);
  const backLightRef = useRef<HTMLDivElement>(null);

  if (!heroConfig.title) return null;

  useEffect(() => {
    let entranceTl: gsap.core.Timeline | null = null;
    let lightingTl: gsap.core.Timeline | null = null;
    let finished = false;
    let removeSkip: () => void = () => {};

    // 기존 포커스 풀 오프닝 — 조명 시퀀스의 피날레로 실행됨
    const playEntrance = () => {
      const tl = gsap.timeline({ delay: 0.2 });
      entranceTl = tl;

      // Focus pull — 아웃포커스에서 서서히 초점을 잡는 시그니처 오프닝
      tl.fromTo(
        imageRef.current,
        { scale: 1.12, opacity: 0, filter: 'blur(28px) brightness(0.6)' },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px) brightness(0.9)',
          duration: 2.8,
          ease: 'power2.out',
        }
      );

      // Title characters animation
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { rotateY: -90, y: 60, opacity: 0 },
          {
            rotateY: 0,
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'back.out(1.7)',
          },
          '-=1.4'
        );
      }

      // Subtitle blur reveal
      tl.fromTo(
        subtitleRef.current,
        { filter: 'blur(20px)', opacity: 0 },
        { filter: 'blur(0px)', opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );

      // Services slide in
      tl.fromTo(
        servicesRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'expo.out' },
        '-=0.4'
      );

      // Line grow
      tl.fromTo(
        lineRef.current,
        { height: 0 },
        { height: 200, duration: 1.5, ease: 'expo.inOut' },
        '-=0.8'
      );

      // Copyright fade
      tl.fromTo(
        copyrightRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=1'
      );

      setLoaded(true);
    };

    // 조명 시퀀스 종료 → 어두운 오버레이 해제 → 포커스 풀 시작
    const finishLighting = () => {
      if (finished) return;
      finished = true;
      if (lightingTl) lightingTl.kill();
      heroLitThisSession = true;
      if (lightingRef.current) {
        gsap.to(lightingRef.current, {
          opacity: 0,
          duration: lightingPhase === 'run' && lightingTl ? 0.5 : 0,
          ease: 'power2.inOut',
          onComplete: () => setLightingPhase('done'),
        });
      } else {
        setLightingPhase('done');
      }
      playEntrance();
    };

    if (lightingPhase === 'run') {
      // 3-큐 조명 시퀀스 (KEY → FILL → BACK)
      lightingTl = gsap.timeline({ delay: 0.35 });

      lightingTl.call(() => setCueText('KEY ON'));
      lightingTl.to(keyLightRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power1.in',
      });

      lightingTl.call(() => setCueText('FILL ON'), undefined, '+=0.15');
      lightingTl.to(fillLightRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power1.in',
      });

      lightingTl.call(() => setCueText('BACK ON'), undefined, '+=0.15');
      lightingTl.to(backLightRef.current, {
        opacity: 1,
        duration: 0.55,
        ease: 'power1.in',
      });

      lightingTl.call(() => setCueText('LIT · ROLL'), undefined, '+=0.25');
      lightingTl.call(finishLighting, undefined, '+=0.45');

      // 클릭 / 스크롤 / 키 입력으로 빨리감기
      const skip = () => finishLighting();
      window.addEventListener('wheel', skip, { passive: true });
      window.addEventListener('keydown', skip);
      if (lightingRef.current) {
        lightingRef.current.addEventListener('click', skip);
      }

      removeSkip = () => {
        window.removeEventListener('wheel', skip);
        window.removeEventListener('keydown', skip);
        lightingRef.current?.removeEventListener('click', skip);
      };
    } else {
      playEntrance();
    }

if (window.matchMedia('(pointer: fine)').matches) {
    // Scroll effects
    const trigger1 = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '50% top',
      scrub: 1,
      onUpdate: (self) => {
        if (imageRef.current) {
          gsap.set(imageRef.current, {
            y: `${self.progress * 45}%`,
            opacity: 1 - self.progress * 0.65,
          });
        }
      },
    });
    triggersRef.current.push(trigger1);

    const trigger2 = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '30% top',
      scrub: 1,
      onUpdate: (self) => {
        if (titleRef.current) {
          gsap.set(titleRef.current, {
            rotateX: -15 * self.progress,
            z: -100 * self.progress,
          });
        }
      },
    });
    triggersRef.current.push(trigger2);

    const trigger3 = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: '10% top',
      end: '40% top',
      scrub: 1,
      onUpdate: (self) => {
        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, {
            opacity: 1 - self.progress,
            y: -30 * self.progress,
          });
        }
      },
    });
    triggersRef.current.push(trigger3);
    }

    return () => {
      if (lightingTl) lightingTl.kill();
      if (entranceTl) entranceTl.kill();
      removeSkip();
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const titleChars = heroConfig.title.split('');

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden perspective-container"
      style={{ perspective: '1200px' }}
    >
      {/* Vignette overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Main background image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{
          willChange: 'transform, opacity',
        }}
      >
        <img
          src={heroConfig.backgroundImage}
          alt="Hero"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.9)' }}
        />
        {/* Chromatic aberration effect layers */}
        <div
          className="absolute inset-0 mix-blend-multiply opacity-50"
          style={{
            backgroundImage: `url(${heroConfig.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'translateX(-2px)',
            filter: 'url(#red-channel)',
          }}
        />
      </div>

      {/* Content container */}
      <div
        className="relative z-20 h-full w-full flex flex-col justify-center items-center px-8"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Main title */}
        <h1
          ref={titleRef}
          className="text-[17vw] whitespace-nowrap md:text-[168px] font-medium text-white tracking-tight mb-4 preserve-3d"
          style={{
            textShadow: '0 0 80px rgba(53, 201, 184, 0.3)',
            willChange: 'transform',
          }}
        >
          {titleChars.map((char, i) => (
            <span
              key={i}
              className={`char inline-block font-display-serif${i === 0 ? ' italic' : ''}`}
              style={{
                transform: `translateY(${(i % 2 === 0 ? -1 : 1) * 8}px)`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-sm sm:text-base md:text-h3 font-extralight text-white/80 tracking-[0.25em] md:tracking-widest text-center px-6"
          style={{ willChange: 'filter, opacity' }}
        >
          {heroConfig.subtitle}
        </p>

        {/* Decorative accent line */}
        <div
          className="absolute left-1/2 bottom-32 w-px bg-highlight z-30"
          ref={lineRef}
          style={{
            transform: 'translateX(-50%)',
            willChange: 'height',
          }}
        />
      </div>

      {/* Services label - vertical left */}
      <div
        ref={servicesRef}
        className="absolute left-8 bottom-32 z-30 hidden md:flex flex-col items-center gap-4"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span className="text-body-sm text-white/60 tracking-widest">
          {heroConfig.servicesLabel}
        </span>
      </div>

      {/* Copyright - bottom right */}
      <div
        ref={copyrightRef}
        className="absolute right-8 bottom-8 z-30"
      >
        <span className="text-body-sm text-white/40">{heroConfig.copyright}</span>
      </div>

      {/* 조명 켜기 인트로 오버레이 — KEY → FILL → BACK */}
      {lightingPhase === 'run' && (
        <div
          ref={lightingRef}
          className="absolute inset-0 z-40"
          style={{ cursor: 'pointer' }}
        >
          {/* 어두운 베일 — 장면은 존재하지만 아직 조명이 켜지지 않은 상태 */}
          <div className="absolute inset-0 bg-black/[0.94]" />

          {/* KEY LIGHT — 상단 좌측의 따뜻한 키 라이트 */}
          <div
            ref={keyLightRef}
            className="absolute inset-0 opacity-0 mix-blend-screen"
            style={{
              background:
                'radial-gradient(75% 65% at 24% 18%, rgba(255, 216, 170, 0.5), transparent 70%)',
            }}
          />

          {/* FILL LIGHT — 반대편의 차가운 필 라이트, 그림자 리프트 */}
          <div
            ref={fillLightRef}
            className="absolute inset-0 opacity-0 mix-blend-screen"
            style={{
              background:
                'radial-gradient(75% 65% at 78% 50%, rgba(140, 180, 220, 0.38), transparent 70%)',
            }}
          />

          {/* BACK LIGHT — 상단 림/엣지 하이라이트 */}
          <div
            ref={backLightRef}
            className="absolute inset-0 opacity-0 mix-blend-screen"
            style={{
              background:
                'linear-gradient(to bottom, rgba(53, 201, 184, 0.32), transparent 38%)',
            }}
          />

          {/* 조명부 로그 — monospace teal, 하단 좌측 */}
          <div className="absolute left-8 bottom-8 font-mono text-[10px] tracking-[0.35em] text-highlight/70">
            {cueText}
          </div>

          {/* 스킵 안내 — 거의 보이지 않게 */}
          <div className="absolute right-8 bottom-8 font-mono text-[10px] tracking-[0.35em] text-white/20">
            SKIP — CLICK
          </div>
        </div>
      )}

      {/* SVG filters for chromatic aberration */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="red-channel">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="blue-channel">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
    </section>
  );
}
