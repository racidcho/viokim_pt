// ============================================================================
// Site Configuration
// ============================================================================

import { featuredWorks } from './works-data';

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "김비오 VIO KIM — Cinematographer",
  description: "촬영감독 김비오 포트폴리오. 빛과 어둠 사이, 프레임 안의 이야기.",
  language: "ko",
};

// ============================================================================
// Navigation Configuration
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  items: NavItem[];
}

export const navigationConfig: NavigationConfig = {
  logo: "VIO KIM",
  items: [
    { label: "WORKS", href: "#works" },
    { label: "FILMOGRAPHY", href: "#filmography" },
    { label: "ABOUT", href: "#about" },
    { label: "AWARDS", href: "#credentials" },
    { label: "CONTACT", href: "#contact" },
  ],
};

// ============================================================================
// Hero Section Configuration
// ============================================================================

export interface HeroConfig {
  title: string;
  subtitle: string;
  backgroundImage: string;
  servicesLabel: string;
  copyright: string;
}

export const heroConfig: HeroConfig = {
  title: "VIO KIM",
  subtitle: "CINEMATOGRAPHER 김비오",
  backgroundImage: "/hero-main.jpg",
  servicesLabel: "FEATURE · SHORT · DOCUMENTARY",
  copyright: "© 2026 VIO KIM · VK FILM",
};

// ============================================================================
// About Section Configuration
// ============================================================================

export interface AboutConfig {
  titleLine1: string;
  titleLine2: string;
  description: string;
  image1: string;
  image1Alt: string;
  image2: string;
  image2Alt: string;
  authorImage: string;
  authorName: string;
  authorBio: string;
}

export const aboutConfig: AboutConfig = {
  titleLine1: "빛과 어둠 사이,",
  titleLine2: "프레임 안의 이야기",
  description:
    "촬영감독 김비오입니다. 2020년부터 장편·단편·다큐멘터리를 오가며 17편 이상의 작품을 촬영했습니다. 부산국제영화제, SXSW, 전주국제영화제 등에서 초청·상영되었고, 제7회 충무로영화제 감독주간 올해의 촬영·조명상을 수상했습니다. VK FILM의 디렉터·비디오그래퍼·포토그래퍼로도 활동하며 브랜드 필름, 다큐멘터리, 뮤직비디오를 만들고 있습니다.",
  image1: "/about-1.jpg",
  image1Alt: "촬영감독 김비오",
  image2: "/about-2.jpg",
  image2Alt: "영화 '미아' 스틸",
  authorImage: "/photographer.jpg",
  authorName: "김비오 VIO KIM",
  authorBio:
    "Cinematographer · VK FILM Director\n2025 부산국제영화제 공식 초청 '미아' 촬영",
};

// ============================================================================
// Works Section Configuration
// ============================================================================

export interface WorkItem {
  id: number;
  title: string;
  category: string;
  image: string;
  slug: string;
}

export interface WorksConfig {
  title: string;
  subtitle: string;
  projects: WorkItem[];
}

export const worksConfig: WorksConfig = {
  title: "WORKS",
  subtitle:
    "장편 · 단편 · 다큐멘터리 — 부산국제영화제, SXSW, 전주국제영화제 초청작을 포함한 필모그래피. 각 작품을 선택하면 스틸 갤러리와 촬영 노트를 볼 수 있습니다.",
  projects: featuredWorks.map((w, i) => ({
    id: i + 1,
    title: w.titleKo,
    category: `${w.titleEn} · ${w.year} · ${w.categoryLabel}`,
    image: w.card,
    slug: w.slug,
  })),
};

// ============================================================================
// Services Section Configuration
// ============================================================================

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ServicesConfig {
  title: string;
  subtitle: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  title: "",
  subtitle: "",
  services: [],
};

// ============================================================================
// Testimonials Section Configuration
// ============================================================================

export interface TestimonialItem {
  id: number;
  name: string;
  title: string;
  quote: string;
  image: string;
}

export interface TestimonialsConfig {
  title: string;
  testimonials: TestimonialItem[];
}

export const testimonialsConfig: TestimonialsConfig = {
  title: "REVIEWS",
  testimonials: [
    {
      id: 1,
      name: "Korean Film News",
      title: "'혀' 리뷰",
      quote:
        "While transposing the universal gender dynamic of mansplaining into the intimate domestic narrative of a Korean household, the film achieves genre-level sophistication through surreal visuals and meticulous sound design.",
      image: "/testimonial-1.jpg",
    },
    {
      id: 2,
      name: "Leah",
      title: "Reviewer — '확장기' 리뷰",
      quote:
        "Fantastic in its approach to queer dynamics and relationships. I especially loved the visuals of skin, veins, plastic, sea, sand all interconnected and mixing. The colors were also so satisfying.",
      image: "/testimonial-2.jpg",
    },
    {
      id: 3,
      name: "충무로영화제 감독주간",
      title: "제7회 올해의 촬영·조명상",
      quote:
        "2022년 올해의 촬영·조명상 수상. 제6회 제주혼듸독립영화제 혼듸피플상 수상.",
      image: "/testimonial-3.jpg",
    },
  ],
};

// ============================================================================
// Pricing Section Configuration
// ============================================================================

export interface PricingPlan {
  id: number;
  name: string;
  price: number;
  unit: string;
  featured: boolean;
  features: string[];
}

export interface PricingConfig {
  title: string;
  subtitle: string;
  ctaButtonText: string;
  plans: PricingPlan[];
}

export const pricingConfig: PricingConfig = {
  title: "",
  subtitle: "",
  ctaButtonText: "",
  plans: [],
};

// ============================================================================
// FAQ Section Configuration
// ============================================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQConfig {
  title: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQConfig = {
  title: "",
  faqs: [],
};

// ============================================================================
// Blog Section Configuration
// ============================================================================

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
  category: string;
}

export interface BlogConfig {
  title: string;
  subtitle: string;
  allPostsLabel: string;
  readMoreLabel: string;
  readTimePrefix: string;
  posts: BlogPost[];
}

export const blogConfig: BlogConfig = {
  title: "",
  subtitle: "",
  allPostsLabel: "",
  readMoreLabel: "",
  readTimePrefix: "",
  posts: [],
};

// ============================================================================
// Contact Section Configuration
// ============================================================================

export interface ContactFormOption {
  value: string;
  label: string;
}

export interface ContactConfig {
  title: string;
  subtitle: string;
  nameLabel: string;
  emailLabel: string;
  projectTypeLabel: string;
  projectTypePlaceholder: string;
  projectTypeOptions: ContactFormOption[];
  messageLabel: string;
  submitButtonText: string;
  image: string;
}

export const contactConfig: ContactConfig = {
  title: "함께 만들어요",
  subtitle: "장편 · 단편 · 다큐멘터리 · 브랜드 필름 — 촬영 문의는 언제든 환영합니다.",
  nameLabel: "이름 *",
  emailLabel: "이메일 *",
  projectTypeLabel: "프로젝트 유형",
  projectTypePlaceholder: "선택하세요...",
  projectTypeOptions: [
    { value: "feature", label: "장편 영화" },
    { value: "short", label: "단편 영화" },
    { value: "documentary", label: "다큐멘터리" },
    { value: "commercial", label: "브랜드 필름 / 뮤직비디오" },
  ],
  messageLabel: "메시지",
  submitButtonText: "보내기",
  image: "/contact.jpg",
};

// ============================================================================
// Footer Configuration
// ============================================================================

export interface FooterLink {
  label: string;
  href: string;
  icon?: string;
}

export interface FooterConfig {
  marqueeText: string;
  marqueeHighlightChars: string[];
  navLinks1: FooterLink[];
  navLinks2: FooterLink[];
  ctaText: string;
  ctaHref: string;
  copyright: string;
  tagline: string;
}

export const footerConfig: FooterConfig = {
  marqueeText: "EVERY FRAME TELLS A STORY",
  marqueeHighlightChars: ["F", "S"],
  navLinks1: [
    { label: "Works", href: "#works" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
  navLinks2: [
    { label: "viokimfilm@gmail.com", href: "mailto:viokimfilm@gmail.com" },
    { label: "+82 10 6304 3381", href: "tel:+821063043381" },
    { label: "Instagram", href: "#", icon: "Instagram" },
  ],
  ctaText: "View Works",
  ctaHref: "#works",
  copyright: "© 2026 VIO KIM · VK FILM. All rights reserved.",
  tagline: "Cinematographer 김비오",
};
