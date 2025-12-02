import { useEffect, useState, useRef } from "react";
import { universitiesByPrefecture, prefecturesWithUniversities, type University } from "@/data/universities";

export function JapanMap() {
  const [svgContent, setSvgContent] = useState<string>("");
  const [hoveredPrefecture, setHoveredPrefecture] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SVGファイルを読み込む
    fetch("/japan-map.svg")
      .then((res) => res.text())
      .then((svg) => {
        setSvgContent(svg);
      });
  }, []);

  // スクロールアニメーション用のIntersectionObserver
  useEffect(() => {
    const currentRef = wrapperRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    const container = containerRef.current;
    const svgElement = container.querySelector("svg");
    if (!svgElement) return;

    // すべての都道府県要素を取得
    const prefectures = svgElement.querySelectorAll(".prefecture");

    prefectures.forEach((pref) => {
      const prefCode = pref.getAttribute("data-code");
      if (!prefCode) return;

      // 実績のある都道府県かチェック
      const hasUniversity = prefecturesWithUniversities.includes(prefCode);

      // 基本スタイルを設定
      (pref as SVGElement).style.transition = "all 0.5s ease";
      
      if (hasUniversity) {
        (pref as SVGElement).style.fill = "oklch(0.35 0.08 160)";
        (pref as SVGElement).style.fillOpacity = "0.7";
        (pref as SVGElement).style.stroke = "oklch(0.25 0.08 160)";
        (pref as SVGElement).style.strokeWidth = "1.5";
        (pref as SVGElement).style.cursor = "pointer";
      } else {
        (pref as SVGElement).style.fill = "#f0f0f0";
        (pref as SVGElement).style.fillOpacity = "1";
        (pref as SVGElement).style.stroke = "#999";
        (pref as SVGElement).style.strokeWidth = "0.8";
        (pref as SVGElement).style.cursor = "default";
      }

      // マウスオーバーイベント
      pref.addEventListener("mouseenter", (e: Event) => {
        if (!hasUniversity) return;

        const mouseEvent = e as MouseEvent;
        setHoveredPrefecture(prefCode);
        setTooltipPosition({
          x: mouseEvent.clientX,
          y: mouseEvent.clientY,
        });

        (pref as SVGElement).style.fillOpacity = "1";
        (pref as SVGElement).style.strokeWidth = "2.5";
      });

      pref.addEventListener("mousemove", (e: Event) => {
        if (!hasUniversity) return;

        const mouseEvent = e as MouseEvent;
        setTooltipPosition({
          x: mouseEvent.clientX,
          y: mouseEvent.clientY,
        });
      });

      pref.addEventListener("mouseleave", () => {
        if (!hasUniversity) return;

        setHoveredPrefecture(null);
        (pref as SVGElement).style.fillOpacity = "0.7";
        (pref as SVGElement).style.strokeWidth = "1.5";
      });
    });

    // 境界線のスタイルを設定（より見やすく）
    const boundaryLines = svgElement.querySelectorAll(".boundary-line");
    boundaryLines.forEach((line) => {
      (line as SVGElement).style.stroke = "#666";
      (line as SVGElement).style.strokeWidth = "1";
    });
  }, [svgContent]);

  // スクロールで表示されたときに順次アニメーション
  useEffect(() => {
    if (!isVisible || !containerRef.current || !svgContent) return;

    const container = containerRef.current;
    const svgElement = container.querySelector("svg");
    if (!svgElement) return;

    const prefectures = svgElement.querySelectorAll(".prefecture");
    
    // 実績のある都道府県のみを抽出
    const highlightedPrefs: SVGElement[] = [];
    prefectures.forEach((pref) => {
      const prefCode = pref.getAttribute("data-code");
      if (prefCode && prefecturesWithUniversities.includes(prefCode)) {
        highlightedPrefs.push(pref as SVGElement);
      }
    });

    // 各都道府県を順次アニメーション
    highlightedPrefs.forEach((pref, index) => {
      setTimeout(() => {
        // パルスアニメーション
        pref.style.transform = "scale(1.08)";
        pref.style.transformOrigin = "center";
        pref.style.fillOpacity = "1";
        pref.style.filter = "drop-shadow(0 4px 8px rgba(0,0,0,0.3))";
        
        setTimeout(() => {
          pref.style.transform = "scale(1)";
          pref.style.fillOpacity = "0.7";
          pref.style.filter = "none";
        }, 400);
      }, index * 80);
    });
  }, [isVisible, svgContent]);

  const hoveredUniversities = hoveredPrefecture
    ? universitiesByPrefecture[hoveredPrefecture] || []
    : [];

  return (
    <div ref={wrapperRef} className="relative">
      <div
        ref={containerRef}
        className="w-full max-w-2xl mx-auto"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        ● 講演・研修実績のある大学（21校）
      </p>

      {/* ツールチップ */}
      {hoveredPrefecture && hoveredUniversities.length > 0 && (
        <div
          className="fixed z-50 bg-background border-2 rounded-lg shadow-xl p-4 max-w-sm pointer-events-none"
          style={{
            left: `${tooltipPosition.x + 15}px`,
            top: `${tooltipPosition.y + 15}px`,
            borderColor: "oklch(0.35 0.08 160)",
          }}
        >
          <h4 className="font-semibold mb-2 text-base" style={{ color: "oklch(0.35 0.08 160)" }}>
            {hoveredUniversities[0].prefecture}
          </h4>
          <ul className="space-y-2">
            {hoveredUniversities.map((uni, index) => (
              <li key={index} className="text-sm">
                <p className="font-medium">{uni.name}</p>
                <p className="text-xs text-muted-foreground">
                  {uni.date} - {uni.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
