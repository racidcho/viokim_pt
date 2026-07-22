import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { contactConfig } from '../config';

const contactEmail = 'viokimfilm@gmail.com';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const projectLabel =
      contactConfig.projectTypeOptions.find((option) => option.value === formData.projectType)
        ?.label ?? '프로젝트 문의';
    const subject = `[촬영 문의] ${projectLabel} · ${formData.name}`;
    const body = [
      `이름: ${formData.name}`,
      `회신 이메일: ${formData.email}`,
      `프로젝트 유형: ${projectLabel}`,
      '',
      formData.message,
    ].join('\n');

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const fieldClass =
    'w-full border-0 border-b border-black/25 bg-transparent px-0 py-3 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-black focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-4 focus-visible:ring-offset-[#ecebe6]';

  return (
    <section id="contact" className="bg-black px-4 py-20 text-black sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl overflow-hidden bg-[#ecebe6] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col p-6 sm:p-10 lg:p-14">
          <p className="mb-8 font-mono text-[10px] tracking-[0.28em] text-black/45">
            05 · START A CONVERSATION
          </p>
          <h2 className="max-w-[760px] font-display-serif text-[clamp(4rem,8vw,8rem)] leading-[0.82] tracking-[-0.065em]">
            LET'S MAKE
            <br />
            <span className="italic text-highlight">A FRAME.</span>
          </h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-black/60 sm:text-lg">
            {contactConfig.subtitle}
          </p>

          <form onSubmit={handleSubmit} className="mt-12 grid gap-7 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="font-mono text-[10px] tracking-[0.18em] text-black/50">
                {contactConfig.nameLabel}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="font-mono text-[10px] tracking-[0.18em] text-black/50">
                {contactConfig.emailLabel}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                className={fieldClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contact-type" className="font-mono text-[10px] tracking-[0.18em] text-black/50">
                {contactConfig.projectTypeLabel}
              </label>
              <select
                id="contact-type"
                name="projectType"
                required
                value={formData.projectType}
                onChange={(event) => setFormData({ ...formData, projectType: event.target.value })}
                className={fieldClass}
              >
                <option value="">{contactConfig.projectTypePlaceholder}</option>
                {contactConfig.projectTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contact-message" className="font-mono text-[10px] tracking-[0.18em] text-black/50">
                {contactConfig.messageLabel}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                className={`${fieldClass} resize-y`}
              />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-5 border-t border-black/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-xs leading-relaxed text-black/45">
                메일 앱이 열리지 않으면{' '}
                <a className="underline underline-offset-4 hover:text-black" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
                으로 보내주세요.
              </p>
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-black px-6 font-mono text-[11px] tracking-[0.2em] text-white transition-colors hover:bg-highlight hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
              >
                OPEN EMAIL <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        <div className="relative min-h-[430px] overflow-hidden lg:min-h-full" data-cursor>
          <img
            src={contactConfig.image}
            alt="촬영 현장의 김비오 촬영감독"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/75 px-5 py-4 font-mono text-[9px] tracking-[0.18em] text-white/70">
            <span>SEOUL · AVAILABLE WORLDWIDE</span>
            <span>VIO KIM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
