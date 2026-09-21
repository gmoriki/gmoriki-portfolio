import { useLayoutEffect, useRef, useState } from "react";
import { sitePaths } from "./site-paths";
import { moveGreenInk, PointerInk } from "./green-interactions";

export type WordmarkTypeface = {
  family: string;
  weight: number;
  tracking: string;
  fontVariationSettings?: string;
};

const defaultTypeface: WordmarkTypeface = {
  family: "Instrument Sans",
  weight: 600,
  tracking: "-.055em",
};

export function Wordmark({
  face = defaultTypeface,
  className = "",
  id,
  interactive = false,
}: {
  face?: WordmarkTypeface;
  className?: string;
  id?: string;
  interactive?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const letters = useRef<HTMLSpanElement>(null);
  const setting = face;
  useLayoutEffect(() => {
    let active = true;
    function fit() {
      if (!active || !box.current || !letters.current) return;
      letters.current.style.fontSize = "100px";
      const width = letters.current.getBoundingClientRect().width;
      if (width)
        letters.current.style.fontSize = `${(box.current.clientWidth / width) * 100}px`;
    }
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box.current!);
    document.fonts
      .load(`${setting.weight} 100px "${setting.family}"`, "gmoriki")
      .then(fit)
      .catch(fit);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [setting]);
  return (
    <div
      id={id}
      ref={box}
      className={`wordmark ${className}`}
      aria-label="gmoriki"
    >
      <span
        ref={letters}
        className={interactive ? "green-pointer" : undefined}
        onPointerMove={interactive ? moveGreenInk : undefined}
        style={{
          fontFamily: `"${setting.family}", sans-serif`,
          fontWeight: setting.weight,
          letterSpacing: setting.tracking,
          fontOpticalSizing: "none",
          fontVariationSettings: setting.fontVariationSettings,
        }}
      >
        gmoriki
        {interactive && (
          <span className="green-pointer-copy" aria-hidden="true">
            gmoriki
          </span>
        )}
      </span>
    </div>
  );
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={diagonal ? "arrow diagonal" : "arrow"}
    >
      <path d="M4 12h15M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Navigation({
  current,
}: {
  current?: "home" | "works" | "profile" | "type" | "identity" | "logo";
}) {
  const navigation = useRef<HTMLElement | null>(null);
  const [mastheadPassed, setMastheadPassed] = useState(false);
  const hideName = current === "home" && !mastheadPassed;

  useLayoutEffect(() => {
    if (!location.hash) return;
    const entry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (entry && entry.type !== "navigate") return;
    // The browser can resolve a fragment before React has rendered its target.
    // Wait for layout effects (including wordmark sizing), then position it.
    const frame = requestAnimationFrame(() => {
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useLayoutEffect(() => {
    if (current !== "home") return;
    const header = navigation.current;
    const masthead = document.getElementById("hero-wordmark");
    if (!header || !masthead) return;

    let intersection: IntersectionObserver | undefined;
    const observe = () => {
      const height = header.getBoundingClientRect().height;
      const update = (bottom: number) => setMastheadPassed(bottom <= height);
      update(masthead.getBoundingClientRect().bottom);
      intersection?.disconnect();
      // The sticky header covers this part of the viewport. Reveal the small
      // name only once the large wordmark has passed underneath it completely.
      intersection = new IntersectionObserver(
        ([entry]) => update(entry.boundingClientRect.bottom),
        { rootMargin: `-${height}px 0px 0px 0px`, threshold: 0 }
      );
      intersection.observe(masthead);
    };
    observe();
    const resize = new ResizeObserver(observe);
    resize.observe(header);
    return () => {
      intersection?.disconnect();
      resize.disconnect();
    };
  }, [current]);

  return (
    <header
      ref={element => {
        navigation.current = element;
      }}
      className="navigation navigation--branded navigation--site"
    >
      <a
        className={`home-link identity-link${hideName ? " home-link--hidden" : ""}`}
        href={sitePaths.home}
        aria-label="森木銀河 gmoriki トップへ"
        aria-hidden={hideName || undefined}
        tabIndex={hideName ? -1 : undefined}
      >
        <PointerInk text="gmoriki" className="identity__handle" />
      </a>
      <nav aria-label="メインナビゲーション">
        <a
          href={sitePaths.works}
          aria-current={current === "works" ? "page" : undefined}
        >
          Works
        </a>
        <a
          href={sitePaths.profile}
          aria-current={current === "profile" ? "page" : undefined}
        >
          About
        </a>
        <a href={`${sitePaths.home}#contact`}>Contact</a>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <p>© 2026 gmoriki</p>
      <div>
        <a href={sitePaths.profile}>プロフィール・経歴</a>
        {/* Brand paths: Simple Icons (CC0), v16.0.0; Twitter bird: v11.15.0.
            https://github.com/simple-icons/simple-icons */}
        <span className="footer-socials">
          <a
            className="footer-social-link footer-social-link--note"
            href="https://note.com/pogohopper8"
            target="_blank"
            rel="noreferrer"
            aria-label="note（新しいタブで開く）"
            title="note"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M0 .279c4.623 0 10.953-.235 15.498-.117 6.099.156 8.39 2.813 8.468 9.374.077 3.71 0 14.335 0 14.335h-6.598c0-9.296.04-10.83 0-13.759-.078-2.578-.814-3.807-2.795-4.041-2.097-.235-7.975-.04-7.975-.04v17.84H0Z" />
            </svg>
          </a>
          <a
            className="footer-social-link"
            href="https://speakerdeck.com/gmoriki"
            target="_blank"
            rel="noreferrer"
            aria-label="Speaker Deck（新しいタブで開く）"
            title="Speaker Deck"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M10.025 13.875H4.687a4.688 4.688 0 0 1 0-9.375h6.227a1.875 1.875 0 0 1 0 3.75H4.592a.937.937 0 1 0 0 1.875h5.337a4.687 4.687 0 1 1 0 9.375H1.875a1.875 1.875 0 0 1 0-3.75h8.15a.938.938 0 0 0 0-1.875zM13.97 19.5a5.635 5.635 0 0 0 2.396-3.75h3.026a.93.93 0 0 0 .921-.938V9.189a.93.93 0 0 0-.921-.938h-5.497c.438-.498.704-1.155.704-1.875s-.266-1.377-.704-1.875h6.418C22.35 4.5 24 6.179 24 8.25v7.5c0 2.071-1.65 3.75-3.687 3.75H13.97z" />
            </svg>
          </a>
          <a
            className="footer-social-link"
            href="https://x.com/pogohopper8"
            target="_blank"
            rel="noreferrer"
            aria-label="X（旧Twitter、新しいタブで開く）"
            title="X（旧Twitter）"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148 13.98 13.98 0 0 0 11.82 8.292a4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z" />
            </svg>
          </a>
        </span>
      </div>
    </footer>
  );
}
