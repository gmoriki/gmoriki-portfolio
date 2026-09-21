import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { projects } from "./projects";
import "./green-interactions.css";

export type ReadingTopic = "learning" | "governance";
const readingTopics = {
  learning: {
    title: "P4Us",
    text: projects.find(item => item.id === "p4us")!.description,
    href: projects.find(item => item.id === "p4us")!.href,
    action: "ガイドを読む",
  },
  governance: {
    title: "大学職員のための生成AI最前線",
    text: projects.find(item => item.id === "governance")!.description,
    href: projects.find(item => item.id === "governance")!.href,
    action: "講演資料を読む",
  },
};

export function moveGreenInk(event: PointerEvent<HTMLElement>) {
  if (
    event.pointerType !== "mouse" ||
    !matchMedia("(hover: hover) and (pointer: fine)").matches ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--green-x",
    `${event.clientX - bounds.left}px`
  );
  event.currentTarget.style.setProperty(
    "--green-y",
    `${event.clientY - bounds.top}px`
  );
}

export function PointerInk({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`green-pointer ${className}`} onPointerMove={moveGreenInk}>
      {text}
      <span className="green-pointer-copy" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}

export function ScrollInk({
  children,
  marker = false,
  enabled = true,
}: {
  children: ReactNode;
  marker?: boolean;
  enabled?: boolean;
}) {
  const node = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const target = node.current;
    if (!target) return;
    if (!enabled) {
      target.style.setProperty("--green-read", "0");
      return;
    }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function update() {
      frame = 0;
      if (!target) return;
      const progress = Math.max(
        0,
        Math.min(
          1,
          (innerHeight * 0.86 - target.getBoundingClientRect().top) /
            (innerHeight * 0.36)
        )
      );
      target.style.setProperty(
        "--green-read",
        String(reduced.matches ? Number(progress > 0.5) : progress)
      );
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    resize.observe(target);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, [enabled]);
  return (
    <span
      ref={node}
      className={`green-scroll-ink${marker ? " green-scroll-marker" : ""}`}
    >
      <span>{children}</span>
      {marker && (
        <span className="green-scroll-copy" aria-hidden="true">
          {children}
        </span>
      )}
    </span>
  );
}

type ReadingContextValue = {
  id: string;
  topic: ReadingTopic | null;
  open: (topic: ReadingTopic, trigger: HTMLButtonElement) => void;
};
const ReadingContext = createContext<ReadingContextValue | null>(null);

export function GreenTerm({
  children,
  topic,
}: {
  children: ReactNode;
  topic: ReadingTopic;
}) {
  const context = useContext(ReadingContext);
  if (!context) return <>{children}</>;
  return (
    <button
      type="button"
      className="green-term"
      aria-controls={context.id}
      aria-expanded={context.topic === topic}
      onClick={event => context.open(topic, event.currentTarget)}
    >
      {children}
    </button>
  );
}

export function ReadingScope({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [topic, setTopic] = useState<ReadingTopic | null>(null);
  const id = useId();
  const scope = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  function close() {
    const restoreFocus = panel.current?.contains(document.activeElement);
    setTopic(null);
    if (restoreFocus) lastTrigger.current?.focus({ preventScroll: true });
  }
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function inspect() {
      const selection = getSelection();
      if (!selection || selection.isCollapsed || !selection.rangeCount) return;
      const range = selection.getRangeAt(0);
      if (
        !scope.current?.contains(range.commonAncestorContainer) ||
        panel.current?.contains(range.commonAncestorContainer)
      )
        return;
      const text = selection.toString().replace(/\s/g, "");
      if (text.length > 160) return;
      const selected = /ガバナンス|ガイドライン/.test(text)
        ? "governance"
        : /学び|人材育成|研修|教材|P4Us/.test(text)
          ? "learning"
          : null;
      if (selected) setTopic(selected);
    }
    function selectionChanged() {
      clearTimeout(timer);
      timer = setTimeout(inspect, 180);
    }
    document.addEventListener("selectionchange", selectionChanged);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("selectionchange", selectionChanged);
    };
  }, []);
  useEffect(() => {
    if (!topic) return;
    function escape(event: KeyboardEvent) {
      // A modal owns Escape while open; the related note must not steal focus.
      if (event.key === "Escape" && !document.querySelector("dialog[open]"))
        close();
    }
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [topic]);
  const selected = topic ? readingTopics[topic] : null;
  return (
    <ReadingContext.Provider
      value={{
        id,
        topic,
        open: (next, trigger) => {
          lastTrigger.current = trigger;
          setTopic(topic === next ? null : next);
        },
      }}
    >
      <div ref={scope} className={`green-reading-scope ${className}`}>
        {children}
        <aside
          ref={panel}
          id={id}
          className="green-word-note"
          hidden={!selected}
          aria-label="選んだ言葉に関連する実践"
        >
          {selected && (
            <>
              <div className="green-note-top">
                <p>言葉から、実践へ</p>
                <button
                  type="button"
                  onClick={close}
                  aria-label="関連する実践を閉じる"
                >
                  ×
                </button>
              </div>
              <h3>
                {topic === "governance" ? (
                  <>
                    <span>大学職員のための</span>
                    <span>生成AI最前線</span>
                  </>
                ) : (
                  selected.title
                )}
              </h3>
              <p>{selected.text}</p>
              <a
                className="text-link"
                href={selected.href}
                target="_blank"
                rel="noreferrer"
              >
                {selected.action}
                <span aria-hidden="true">↗</span>
              </a>
            </>
          )}
        </aside>
        <span className="green-sr-only" aria-live="polite">
          {selected ? `${selected.title}への関連リンクを表示しました。` : ""}
        </span>
      </div>
    </ReadingContext.Provider>
  );
}
