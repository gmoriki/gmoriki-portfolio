import { useEffect, useState, useRef } from "react";
import { JapanMap } from "./JapanMap";

// Tag component
const Tag = ({ label }: { label: string }) => (
  <span className="inline-block px-3 py-1 text-sm font-bold bg-primary text-primary-foreground" style={{ fontFamily: '"Noto Sans JP", sans-serif' }}>
    {label}
  </span>
);

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

const stats: StatItem[] = [
  { label: "論文・発表", value: 2, suffix: "件" },
  { label: "講演・研修", value: 48, suffix: "件" },
  { label: "社会貢献活動", value: 10, suffix: "件" },
  { label: "Works(作品等)", value: 3, suffix: "件" },
];

const notableWorks = [
  {
    year: "2023年",
    items: [
      {
        date: "2023年",
        title: "国内大学の生成AIポリシー データベース公開",
        description: "国内大学の生成AIに関するポリシーやガイドラインを体系的にまとめたデータベース。2023年3月から2024年9月までリアルタイムに更新。多数の論文やリサーチペーパー、大学HP（東北大学等）に参考資料として引用されています",
        link: "https://docs.google.com/spreadsheets/d/1cDOqaIdu9JKOYuF0ThG33oixE09m210z/edit#gid=1530250804",
        image: "/policy-database.png",
        tags: ["プロダクト", "論文・発表", "オープンソース"],
      },
      {
        date: "2023年12月6-7日",
        title: "大学職員のための生成AIコーディネーター養成講座",
        subtitle: "研修名：大学職員のための生成AIコーディネーター養成講座",
        description: "大学の現場で生成AI活用を推進する人材を育成プログラム。一泊二日にわたる包括的な研修で、日常業務における生成AI活用と組織体制の整備をインプット。修了生の多くは生成AIコーディネーターとして活躍中（金沢大学、滋賀大学、岐阜聖徳学園大学等）。",
        organization: "愛媛大学教育企画室",
        tags: ["研修"],
      },
    ],
  },
  {
    year: "2024年",
    items: [
      {
        date: "2024年",
        title: "大学職員のためのプロンプトガイド開発",
        description: "実務で使えるプロンプト集を体系化。多数の大学（九州大学、立命館大学、北陸大学等）に引用され、大学業務における生成AI活用のスタンダードとして広く利用されています。",
        link: "https://promptforus.com/",
        image: "/prompt-guide.webp",
        tags: ["プロダクト", "論文・発表", "オープンソース"],
      },
      {
        date: "2024年8月27日",
        title: "大学業務における生成AI利活用セミナー",
        subtitle: "講演名：大学職員は生成AIを「実際に」活用できるのか",
        description: "日本マイクロソフトと佐賀大学が共催した実践的なセミナー。基調講演を担当",
        organization: "日本マイクロソフト、佐賀大学共催",
        tags: ["講演"],
      },
    ],
  },
  {
    year: "2025年",
    items: [
      {
        date: "2025年10月27日",
        title: "金沢大学 令和7年度DX研修（生成AI活用（応用編））",
        subtitle: "研修名：生成AI活用の本質的理解：大学DXを加速する「プロトタイプ起点業務」",
        description: "AIを「エイリアン・インテリジェンス（異質な知性）」として捉え、プロトタイプ思考で業務を変革する次世代の研修",
        organization: "金沢大学情報推進室",
        link: "https://note.com/pogohopper8/n/ne605cfd9b08b",
        image: "/kanazawa-dx-training.webp",
        tags: ["研修", "講演", "アドバイザリー"],
      },
      {
        date: "2025年10月27日",
        title: "プロトタイプ起点型の業務を体験しよう（ワークショップ）",
        subtitle: "ワークショップ名：プロトタイプ起点型の業務を体験しよう",
        description: "Google AI Studio「Build with Gemini」を活用した実践的ワークショップ。専門知識不要でWebアプリケーションのプロトタイプを構築し、全職員が当たり前に使える「思考ツール」としてのAI活用を体験",
        organization: "金沢大学情報推進室",
        link: "https://note.com/pogohopper8/n/n391a90174a5f",
        image: "/kanazawa-workshop.webp",
        tags: ["研修", "プロダクト", "教材開発"],
      },
    ],
  },
];

export default function WorksStats() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const statsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [visibleWorks, setVisibleWorks] = useState<Set<number>>(new Set());
  const workRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentRef = statsRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            setIsVisible(true);
            
            // アニメーションで数値をカウントアップ
            const targetValues = stats.map(s => s.value);
            const duration = 1500;
            const steps = 60;
            const stepDuration = duration / steps;
            
            let currentStep = 0;
            
            const interval = setInterval(() => {
              currentStep++;
              const progress = currentStep / steps;
              
              const newCounts = targetValues.map(target => Math.floor(target * progress));
              setCounts(newCounts);
              
              if (currentStep >= steps) {
                clearInterval(interval);
                setCounts(targetValues);
              }
            }, stepDuration);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 主な実績のスクロールアニメーション
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    workRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleWorks((prev) => new Set(prev).add(index));
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="space-y-12">
      {/* Japan Map */}
      <div>
        <h4 className="font-display text-2xl md:text-3xl font-bold mb-6">日本全国の大学を支援しています</h4>
        <JapanMap />
        <p className="text-sm md:text-base text-center mt-4 text-muted-foreground italic">
          👆 地図をタッチして、各都道府県の実績を確認！
        </p>
      </div>

      {/* Period indicator */}
      <p className="text-base md:text-lg text-muted-foreground">
        主な活動実績
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
            <span
              className={`font-display text-4xl md:text-5xl font-bold text-primary transition-all duration-700 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            >
              {counts[index]}{stat.suffix}
            </span>
            <p className="text-base md:text-lg text-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Notable Works */}
      <div className="space-y-8">
        <h4 className="font-display text-2xl md:text-3xl font-bold">主な実績</h4>
        <div className="space-y-12">
          {notableWorks.map((yearGroup, yearIndex) => (
            <div key={yearIndex} className="space-y-6">
              <h5 className="text-xl md:text-2xl font-bold text-primary">
                {yearGroup.year}
              </h5>
              <div className="space-y-6">
                {yearGroup.items.map((work, workIndex) => {
                  const globalIndex = notableWorks.slice(0, yearIndex).reduce((acc, yg) => acc + yg.items.length, 0) + workIndex;
                  const isWorkVisible = visibleWorks.has(globalIndex);
                  
                  return (
                  <div 
                    key={workIndex} 
                    ref={(el) => { workRefs.current[globalIndex] = el; }}
                    className={`border-l-2 border-primary pl-6 py-2 transition-all duration-700 ${
                      isWorkVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        {work.link ? (
                          <a
                            href={work.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base md:text-lg font-semibold hover:underline"
                          >
                            {work.title}
                          </a>
                        ) : (
                          <p className="text-base md:text-lg font-semibold">{work.title}</p>
                        )}
                        <p className="text-sm text-muted-foreground">{work.date}{work.organization && ` | ${work.organization}`}</p>
                        {(work as any).subtitle && (
                          <p className="text-sm font-medium text-foreground mt-1">{(work as any).subtitle}</p>
                        )}
                        {work.tags && work.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-1">
                            {work.tags.map((tag, tagIndex) => (
                              <Tag key={tagIndex} label={tag} />
                            ))}
                          </div>
                        )}
                        <p className="text-sm md:text-base text-muted-foreground">{work.description}</p>
                      </div>
                      {work.image && (
                        <a
                          href={work.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <img
                            src={work.image}
                            alt={work.title}
                            className="w-full max-w-3xl rounded-lg border hover:opacity-90 transition-opacity"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                  );
                })}
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
            className="font-semibold underline hover:no-underline text-primary"
          >
            researchmap
          </a>{" "}
          でご覧いただけます。
        </p>
      </div>
    </div>
  );
}
