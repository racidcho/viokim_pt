// ============================================================================
// DisplayTitle — 영문 산세리프 타이틀
// 각 글자는 .char 스팬으로 출력해 기존 GSAP 글자 애니메이션과 호환된다.
// ============================================================================

interface DisplayTitleProps {
  text: string;
  className?: string;
}

export function DisplayTitle({ text, className = '' }: DisplayTitleProps) {
  const chars = text.split('');

  return (
    <span className={`english-display ${className}`}>
      {chars.map((char, i) => (
        <span key={i} className="char inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
