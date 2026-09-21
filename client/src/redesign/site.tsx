import { useLayoutEffect, useRef, useState } from "react";
import { sitePaths } from "./site-paths";

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
}: {
  face?: WordmarkTypeface;
  className?: string;
  id?: string;
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
        style={{
          fontFamily: `"${setting.family}", sans-serif`,
          fontWeight: setting.weight,
          letterSpacing: setting.tracking,
          fontOpticalSizing: "none",
          fontVariationSettings: setting.fontVariationSettings,
        }}
      >
        gmoriki
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
        <span className="identity__handle">gmoriki</span>
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
        <a href="https://note.com/pogohopper8" target="_blank" rel="noreferrer">
          note
        </a>
        <a
          href="https://speakerdeck.com/gmoriki"
          target="_blank"
          rel="noreferrer"
        >
          Speaker Deck
        </a>
        <a href="https://x.com/pogohopper8" target="_blank" rel="noreferrer">
          X
        </a>
      </div>
    </footer>
  );
}
