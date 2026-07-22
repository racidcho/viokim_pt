import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';

interface SlateInfo {
  scene: string;
  title: string;
  subtitle: string;
}

const SlateContext = createContext<(to: string, info: SlateInfo) => void>(
  () => {}
);

export const useSlateNavigate = () => useContext(SlateContext);

/**
 * 슬레이트(큘래퍼보드) 페이지 전환
 * 카드 탭 → 슬레이트가 올라오고 클랩바가 닫히며("찰칵") → 해당 작품으로 이동
 *
 * 주의: setInfo 직후에는 boardRef가 아직 null이므로
 * 타임라인은 반드시 렌더 이후 useEffect에서 실행한다.
 */
export function SlateProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [info, setInfo] = useState<SlateInfo | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const clapRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const pendingNav = useRef<string | null>(null);

  const playSlate = useCallback((to: string, slateInfo: SlateInfo) => {
    if (busy.current) return;
    busy.current = true;
    pendingNav.current = to;
    setInfo(slateInfo);
  }, []);

  useEffect(() => {
    if (!info || !boardRef.current || !clapRef.current) return;

    // 초기 위치는 GSAP으로만 설정한다 (인라인 transform과 yPercent가
    // 중복 적용돼 보드가 화면 아래에 갇히는 문제 방지)
    gsap.set(boardRef.current, { yPercent: 100 });
    gsap.set(clapRef.current, { rotate: -28 });

    const tl = gsap.timeline({
      onComplete: () => {
        setInfo(null);
        pendingNav.current = null;
        busy.current = false;
      },
    });

    // 보드 상승
    tl.fromTo(
      boardRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.45, ease: 'expo.out' }
    );
    // 클랩바 닫힘 — 찰칵
    tl.fromTo(
      clapRef.current,
      { rotate: -28 },
      { rotate: 0, duration: 0.18, ease: 'power4.in' },
      '+=0.25'
    );
    // 잠깐 홀드 후 이동
    tl.add(() => {
      if (pendingNav.current) void navigate(pendingNav.current);
    }, '+=0.6');
    // 보드 하강
    tl.to(
      boardRef.current,
      { yPercent: -100, duration: 0.5, ease: 'expo.in' },
      '+=0.1'
    );

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '.');

  return (
    <SlateContext.Provider value={playSlate}>
      {children}
      {info && (
        <div className="fixed inset-0 z-[200] pointer-events-none">
          <div
            ref={boardRef}
            className="absolute inset-0 bg-[#111] flex flex-col"
          >
            {/* 클랩바 */}
            <div
              ref={clapRef}
              className="h-16 md:h-20 origin-left flex overflow-hidden"
              style={{
                background:
                  'repeating-linear-gradient(-55deg, #f5f5f5 0 40px, #161616 40px 80px)',
              }}
            />
            {/* 슬레이트 정보 */}
            <div className="flex-1 flex flex-col justify-between px-8 md:px-16 py-8 md:py-12 text-white">
              <div className="flex justify-between text-xs md:text-sm tracking-[0.3em] text-white/60">
                <span>PROD. VIO KIM</span>
                <span>{today}</span>
              </div>
              <div>
                <p className="text-highlight text-xs md:text-sm tracking-[0.4em] mb-3">
                  {info.scene} · TAKE 1
                </p>
                <p className="text-4xl md:text-7xl font-medium tracking-tight">
                  {info.title}
                </p>
                <p className="text-white/50 text-lg md:text-2xl font-extralight tracking-widest mt-2">
                  {info.subtitle}
                </p>
              </div>
              <div className="flex justify-between text-xs md:text-sm tracking-[0.3em] text-white/60">
                <span>DOP. 김비오 VIO KIM</span>
                <span>CAM. A-CAM</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </SlateContext.Provider>
  );
}
