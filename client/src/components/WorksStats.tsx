import { useEffect, useState, useRef } from "react";
import { JapanMap } from "./JapanMap";
import { works, computeStats, getNotableWorks } from "@/data/works-data";

const stats = computeStats(works);
const notableWorks = getNotableWorks();

// Tag component
const Tag = ({ label }: { label: string }) => (
  <span className="inline-block px-3 py-1 text-sm font-bold bg-primary text-primary-foreground" style={{ fontFamily: '"Noto Sans JP", sans-serif' }}>
    {label}
  </span>
);

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
                        {work.subtitle && (
                          <p className="text-sm font-medium text-foreground mt-1">{work.subtitle}</p>
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

    </div>
  );
}
