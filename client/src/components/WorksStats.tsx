import { useEffect, useState } from "react";

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

const recentActivities = [
  { date: "2025年1月", title: "早稲田大学アカデミックソリューション 大学ITマネジメントセミナー", type: "講演" },
  { date: "2024年12月", title: "SPOD(四国地区教職員能力開発ネットワーク)オンラインセミナーシリーズ", type: "講演" },
  { date: "2024年12月", title: "勉強会「生成AIとURA業務」司会・企画", type: "社会貢献" },
  { date: "2024年11月", title: "第13回大学情報・機関調査研究集会 論文集", type: "論文" },
  { date: "2024年8月", title: "大学業務における生成AI利活用セミナー（日本マイクロソフト、佐賀大学）", type: "講演" },
];

function CountUpAnimation({ target, suffix }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds
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
  }, [target]);

  return (
    <span className="font-display text-5xl md:text-6xl font-bold text-accent">
      {count}{suffix}
    </span>
  );
}

export default function WorksStats() {
  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2 text-center">
            <CountUpAnimation target={stat.value} suffix={stat.suffix} />
            <p className="text-base md:text-lg text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activities Timeline */}
      <div className="space-y-6">
        <h4 className="font-display text-2xl md:text-3xl font-bold">最新の活動</h4>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="border-l-2 border-accent pl-6 py-2">
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                <span className="text-sm md:text-base font-semibold text-accent min-w-[100px]">
                  {activity.date}
                </span>
                <div className="flex-1">
                  <p className="text-base md:text-lg">{activity.title}</p>
                  <span className="text-sm text-muted-foreground">
                    {activity.type}
                  </span>
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
            className="text-accent underline hover:no-underline font-semibold"
          >
            researchmap
          </a>{" "}
          でご覧いただけます。
        </p>
      </div>
    </div>
  );
}
