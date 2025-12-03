import { useEffect, useRef, useState } from "react";
import { JapanMap } from "./JapanMap";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

// Tag component
const Tag = ({ label }: { label: string }) => (
  <span className="inline-block px-3 py-1 text-sm font-bold text-white rounded-md" style={{ backgroundColor: 'oklch(0.35 0.08 160)', fontFamily: '"Noto Sans JP", sans-serif' }}>
    {label}
  </span>
);

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

export default function WorksStats() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const statsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const { data: works, isLoading } = trpc.works.list.useQuery();

  useEffect(() => {
    const currentRef = statsRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsVisible(true);
            hasAnimated.current = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = stats.map((stat, index) => {
      const increment = stat.value / steps;
      let currentCount = 0;

      return setInterval(() => {
        currentCount += increment;
        if (currentCount >= stat.value) {
          currentCount = stat.value;
          clearInterval(intervals[index]);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(currentCount);
          return newCounts;
        });
      }, stepDuration);
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [isVisible]);

  // Group works by year
  const groupedWorks = works?.reduce((acc, work) => {
    const year = work.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(work);
    return acc;
  }, {} as Record<string, typeof works>);

  // Sort years in descending order
  const sortedYears = groupedWorks ? Object.keys(groupedWorks).sort((a, b) => b.localeCompare(a)) : [];

  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "oklch(0.35 0.08 160)" }}>
              {counts[index]}
              {stat.suffix}
            </div>
            <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Japan Map */}
      <div className="w-full">
        <h4 className="text-xl md:text-2xl font-bold mb-6">活動エリア</h4>
        <JapanMap />
      </div>

      {/* Notable Works */}
      <div className="space-y-8">
        <h4 className="text-xl md:text-2xl font-bold">主な実績</h4>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : works && works.length > 0 ? (
          <div className="space-y-12">
            {sortedYears.map((year) => (
              <div key={year} className="space-y-6">
                <h5 className="text-lg md:text-xl font-bold" style={{ color: "oklch(0.35 0.08 160)" }}>
                  {year}
                </h5>
                <div className="space-y-8">
                  {groupedWorks![year].map((work) => (
                    <div key={work.id} className="border-l-4 pl-6" style={{ borderColor: "oklch(0.35 0.08 160)" }}>
                      <div className="space-y-3">
                        <div className="text-sm text-muted-foreground">{work.date}</div>
                        <h6 className="text-base md:text-lg font-bold">{work.title}</h6>
                        <p className="text-sm md:text-base text-foreground leading-relaxed">
                          {work.description}
                        </p>
                        {work.organization && (
                          <p className="text-sm text-muted-foreground">主催: {work.organization}</p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {work.tags.map((tag, tagIndex) => (
                            <Tag key={tagIndex} label={tag} />
                          ))}
                        </div>
                        {work.link && (
                          <a
                            href={work.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium hover:underline"
                            style={{ color: "oklch(0.35 0.08 160)" }}
                          >
                            詳細を見る →
                          </a>
                        )}
                        {work.image && (
                          <div className="mt-4">
                            <img
                              src={work.image}
                              alt={work.title}
                              className="w-full max-w-2xl rounded-lg shadow-md"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-12">実績データがありません</p>
        )}
      </div>
    </div>
  );
}
