import { useEffect, useRef, useState } from "react";
import { projects as works } from "./projects";
import {
  Arrow,
  Footer,
  Navigation,
  Wordmark,
  type WordmarkTypeface,
} from "./site";
import { sitePaths } from "./site-paths";

export function HomePage({ typeface }: { typeface?: WordmarkTypeface }) {
  const [selected, setSelected] = useState<(typeof works)[number] | null>(null);
  const modal = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!selected) return;
    modal.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selected]);
  function closeImage() {
    modal.current?.close();
  }
  function onClosed() {
    setSelected(null);
    lastTrigger.current?.focus();
  }
  return (
    <>
      <a className="skip-link" href="#main">
        本文へ
      </a>
      <Navigation current="home" />
      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-identity">
            <Wordmark face={typeface} className="masthead" id="hero-wordmark" />
          </div>
          <div className="hero-bottom">
            <div className="hero-copy">
              <h1 id="hero-title">
                職場としての大学に、
                <br />
                AI人材育成を。
              </h1>
            </div>
            <div className="hero-description">
              <p>
                大学で働く人の学びと、
                <br className="desktop-break" />
                組織のAIガバナンスを支援しています。
              </p>
            </div>
          </div>
        </section>

        <section className="works" id="works" aria-labelledby="works-title">
          <div className="section-intro">
            <h2 id="works-title">Works</h2>
            <a className="text-link" href={sitePaths.works}>
              すべてのWorks
              <Arrow />
            </a>
          </div>
          {works.map(work => (
            <article className={`project project-${work.id}`} key={work.id}>
              <div className="project-caption">
                <div>
                  <h3>
                    {work.id === "governance" ? (
                      <>
                        <span className="title-unit">大学職員のための</span>
                        <span className="title-unit">生成AI最前線</span>
                      </>
                    ) : (
                      work.name
                    )}
                  </h3>
                  <p className="project-description">{work.description}</p>
                </div>
                <div className="project-links">
                  <p>
                    {work.role}
                    {work.year && <span>{work.year}</span>}
                  </p>
                  <a
                    className="text-link"
                    href={work.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {work.action}
                    <Arrow diagonal />
                  </a>
                </div>
              </div>
              <button
                className="project-visual"
                aria-label={`${work.name}の実物画像を拡大`}
                onClick={event => {
                  lastTrigger.current = event.currentTarget;
                  setSelected(work);
                }}
              >
                <picture>
                  {work.mobile && (
                    <source
                      media="(max-width: 600px)"
                      srcSet={work.mobile.image}
                      width={work.mobile.width}
                      height={work.mobile.height}
                    />
                  )}
                  <img
                    src={work.image}
                    alt={work.alt}
                    width={work.width}
                    height={work.height}
                    loading="lazy"
                  />
                </picture>
                <span className="image-hint" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </button>
            </article>
          ))}
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <h2 id="about-title">
            知恵は、
            <br />
            共有財にする。
          </h2>
          <div className="about-copy">
            <p className="about-lead">
              AIとヒトが共に働く環境をつくり、
              <br />
              大学という「場」の価値を守りたい。
            </p>
            <p>
              私立大学・国立大学での実務を経て、現在は会社員として働きながら、gmorikiとして大学のAI活用を支援しています。
            </p>
            <p>
              一人の使い方から、チームの仕事、組織の判断まで。現場で試したことを教材や道具にし、次の人が使えるかたちで公開しています。
            </p>
            <p className="signature">
              森木銀河<span>Ginga Moriki</span>
            </p>
            <div className="about-links">
              <a className="text-link" href={sitePaths.profile}>
                プロフィール・経歴
                <Arrow />
              </a>
              <a
                className="text-link"
                href="https://note.com/pogohopper8/n/ne38a1584eac6"
                target="_blank"
                rel="noreferrer"
              >
                AIガバナンスについての論考
                <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>

        <section
          className="contact"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-top">
            <h2 id="contact-title">
              一緒に、
              <br />
              次の実践を。
            </h2>
            <p>
              大学のAI研修、人材育成、ガバナンスの相談。
              <br />
              いま考えていることから、お聞かせください。
            </p>
          </div>
          <a className="email" href="mailto:info@gmoriki.com">
            info@gmoriki.com
            <Arrow diagonal />
          </a>
        </section>
      </main>
      <Footer />
      <dialog
        ref={modal}
        className="image-dialog"
        aria-labelledby="image-title"
        onClose={onClosed}
        onClick={event => {
          if (event.target === event.currentTarget) closeImage();
        }}
      >
        {selected && (
          <>
            <div className="dialog-bar">
              <h2 id="image-title">{selected.name}</h2>
              <button onClick={closeImage} aria-label="画像を閉じる">
                閉じる <span aria-hidden="true">×</span>
              </button>
            </div>
            <p className="pan-hint">画像は横にスクロールできます。</p>
            <div
              className="image-viewport"
              tabIndex={0}
              role="region"
              aria-label="作品画像。横にスクロールして閲覧"
            >
              <img src={selected.image} alt={selected.alt} />
            </div>
            <a
              className="text-link"
              href={selected.href}
              target="_blank"
              rel="noreferrer"
            >
              {selected.action}
              <Arrow diagonal />
            </a>
          </>
        )}
      </dialog>
    </>
  );
}
