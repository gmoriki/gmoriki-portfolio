import { useEffect, useState, useRef } from "react";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

const stats: StatItem[] = [
  { label: "論文・発表", value: 5, suffix: "件" },
  { label: "講演・研修", value: 45, suffix: "件" },
  { label: "社会貢献活動", value: 9, suffix: "件" },
  { label: "Works(作品等)", value: 5, suffix: "件" },
];

const notableWorks = [
  {
    date: "2025年10月27日",
    title: "金沢大学令和7年度DX研修（生成AI活用（応用編））",
    description: "講演およびワークショップ",
  },
  {
    date: "2024年",
    title: "大学職員のためのプロンプトガイド開発",
    description: "実務で使えるプロンプト集を体系化",
  },
  {
    date: "2024年8月",
    title: "愛媛大学 生成AIコーディネーター養成講座",
    description: "SPADEスキル体系に基づく人材育成プログラム",
  },
  {
    date: "2024年",
    title: "大学業務における生成AI利活用セミナー",
    description: "日本マイクロソフト、佐賀大学と共同開催",
  },
];

function CountUpAnimation({ target, suffix, isVisible }: { target: number; suffix?: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    setHasAnimated(true);
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, target, hasAnimated]);

  return (
    <span
      className={`font-display text-5xl md:text-6xl font-bold transition-all duration-700 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
      }`}
      style={{ color: "oklch(0.35 0.08 160)" }}
    >
      {count}{suffix}
    </span>
  );
}

export default function WorksStats() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-12">
      {/* Period indicator */}
      <p className="text-base md:text-lg text-muted-foreground">
        ここ2年間（2024-2025年）の主な活動実績
      </p>

      {/* Stats Grid with scroll animation */}
      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="space-y-2 text-center"
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <CountUpAnimation target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
            <p className="text-base md:text-lg text-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Notable Works */}
      <div className="space-y-6">
        <h4 className="font-display text-2xl md:text-3xl font-bold">特筆すべき実績</h4>
        <div className="space-y-4">
          {notableWorks.map((work, index) => (
            <div key={index} className="border-l-2 pl-6 py-2" style={{ borderColor: "oklch(0.35 0.08 160)" }}>
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                <span
                  className="text-sm md:text-base font-semibold min-w-[140px]"
                  style={{ color: "oklch(0.35 0.08 160)" }}
                >
                  {work.date}
                </span>
                <div className="flex-1">
                  <p className="text-base md:text-lg font-semibold">{work.title}</p>
                  <p className="text-sm md:text-base text-muted-foreground">{work.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* External Link */}
      <div className="pt-6 border-t">
        <p className="text-base md:text-lg text-muted-foreground">
          全ての実績は{" "}
          <a
            href="https://researchmap.jp/gmoriki"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:no-underline"
            style={{ color: "oklch(0.35 0.08 160)" }}
          >
            researchmap
          </a>{" "}
          でご覧いただけます。
        </p>
      </div>
    </div>
  );
}
