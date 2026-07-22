// ============================================================================
// DisplayTitle — 디스플레이 세리프 타이틀 + 첫 글자 이탤릭 시그니처
// Playfair Display(font-display-serif)를 적용하고, 라틴 문자로 시작하는
// 제목의 첫 글자를 이탤릭으로 세팅한다 (jasonbergh.com 벤치마크 시그니처).
// 각 글자는 .char 스팬으로 출력해 기존 GSAP 글자 애니메이션과 호환된다.
// ============================================================================

interface DisplayTitleProps {
  text: string;
  className?: string;
}

export function DisplayTitle({ text, className = '' }: DisplayTitleProps) {
  const chars = text.split('');
  const firstLatin = chars.findIndex((c) => /[A-Za-z]/.test(c));

  return (
    <span className={`font-display-serif ${className}`}>
      {chars.map((char, i) => (
        <span
          key={i}
          className={`char inline-block${i === firstLatin ? ' italic' : ''}`}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
