import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * 라우트 변경 시 스크롤 리셋
 * - PUSH/REPLACE 납비게이션: 즉시(instant) 최상단으로 이동
 *   (html의 scroll-behavior: smooth 를 우회하기 위해 behavior: 'instant' 명시)
 * - POP(뒤로가기/앞으로가기): 브라우저의 스크롤 복원을 존중해 건드리지 않음
 * - 이전 페이지의 pin-spacer가 정리된 뒤 ScrollTrigger 레이아웃을 재계산
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== 'POP') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    // 라우트 전환 후 핀/스페이서 정리가 끝난 시점에 레이아웃 재계산
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname, navType]);

  return null;
}
