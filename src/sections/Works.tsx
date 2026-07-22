import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useSlateNavigate } from '../components/Slate';
import { WorksSlider } from '../components/WorksSlider';
import { DisplayTitle } from '../components/DisplayTitle';
import { worksConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

type WorksMode = 'grid' | 'slider';

export function Works() {
  const playSlate = useSlateNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const [mode, setMode] = useState<WorksMode>(() => {
    try {
      return sessionStorage.getItem('vk-works-mode') === 'slider'
        ? 'slider'
        : 'grid';
    } catch {
      return 'grid';
    }
  });

  const switchMode = (next: WorksMode) => {
    setMode(next);
    try {
      sessionStorage.setItem('vk-works-mode', next);
    } catch {
      /* storage unavailable — ignore */
    }
  };

  if (!worksConfig.title || worksConfig.projects.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Entry animation
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();

        // Title letter animation
        if (titleRef.current) {
          const chars = titleRef.current.querySelectorAll('.char');
          tl.fromTo(
            chars,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: 'elastic.out(1, 0.5)',
            }
          );
        }

        // Subtitle
        tl.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );

        // Cards 3D flip — GRID 모드에서만
        if (mode === 'grid') {
          cardsRef.current.forEach((card, i) => {
            if (card) {
              tl.fromTo(
                card,
                { rotateY: i % 2 === 0 ? -180 : 180, opacity: 0 },
                {
                  rotateY: 0,
                  opacity: 1,
                  duration: 1,
                  ease: 'expo.out',
                },
                `-=${0.85 - i * 0.15}`
              );
            }
          });
        }
      },
      once: true,
    });
    triggersRef.current.push(trigger);

if (window.matchMedia('(pointer: fine)').matches && mode === 'grid') {
    // Scroll depth effect
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        cardsRef.current.forEach((card, i) => {
          if (card) {
            const depth = -50 + self.progress * 100;
            gsap.set(card, {
              z: depth * (i % 2 === 0 ? 1 : -1) * 0.5,
            });
          }
        });
      },
    });
    triggersRef.current.push(scrollTrigger);
    }

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, [mode]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateX: -y * 10,
      rotateY: x * 16,
      duration: 0.1,
      ease: 'none',
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: 'expo.out',
    });
    setHoveredIndex(null);
  };

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative py-32 px-8 lg:px-16 bg-[#0d1112] overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
          <h2
            ref={titleRef}
            className="text-h1 lg:text-display-xl text-white font-medium"
          >
            <DisplayTitle text={worksConfig.title} />
          </h2>

          {/* GRID / SLIDER 토글 */}
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em]">
            <button
              onClick={() => switchMode('grid')}
              data-cursor
              className={`transition-colors duration-300 cursor-pointer ${
                mode === 'grid'
                  ? 'text-highlight'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              GRID
            </button>
            <span className="text-white/20">/</span>
            <button
              onClick={() => switchMode('slider')}
              data-cursor
              className={`transition-colors duration-300 cursor-pointer ${
                mode === 'slider'
                  ? 'text-highlight'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              SLIDER
            </button>
          </div>
        </div>
        <p
          ref={subtitleRef}
          className="text-body-lg text-white/60 max-w-2xl"
        >
          {worksConfig.subtitle}
        </p>
      </div>

      {mode === 'slider' ? (
        /* SLIDER 모드 — 풀스크린 작품 슬라이더 (풀블리드) */
        <div className="-mx-8 lg:-mx-16">
          <WorksSlider />
        </div>
      ) : (
      /* Projects Grid - Scattered mosaic */
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {worksConfig.projects.map((project, index) => (
            <div
              role="link"
              tabIndex={0}
              onClick={() =>
                playSlate(`/work/${project.slug}`, {
                  scene: `SCENE ${String(project.id).padStart(2, '0')}`,
                  title: project.title,
                  subtitle: project.category,
                })
              }
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                playSlate(`/work/${project.slug}`, {
                  scene: `SCENE ${String(project.id).padStart(2, '0')}`,
                  title: project.title,
                  subtitle: project.category,
                })
              }
              key={project.id}
              className="block cursor-pointer"
            >
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`relative group cursor-pointer preserve-3d ${
                index === 0 ? 'md:col-span-1 md:row-span-1' : ''
              } ${index % 2 === 0 ? 'md:-translate-y-8' : 'md:translate-y-8'}`}
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                transform:
                  hoveredIndex !== null && hoveredIndex !== index
                    ? `translateX(${(index - hoveredIndex) * 15}px)`
                    : 'translateX(0)',
                transition:
                  hoveredIndex !== null
                    ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'none',
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Card content */}
              <div className="relative aspect-[3/4] overflow-hidden bg-dark-gray">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-600 group-hover:scale-110 group-hover:brightness-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <p className="text-body-sm text-white/60 mb-2 group-hover:text-highlight transition-colors duration-300">
                    {project.category}
                  </p>
                  <h3 className="text-h4 lg:text-h3 text-white font-medium group-hover:-translate-y-1 transition-transform duration-300">
                    {project.title}
                  </h3>
                </div>

                {/* Arrow icon */}
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-highlight group-hover:scale-115 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-32 h-32 bg-highlight/5 -translate-x-1/2" />
      <div className="absolute bottom-20 right-0 w-48 h-48 bg-white/5 translate-x-1/3" />
    </section>
  );
}
