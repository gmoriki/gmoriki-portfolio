import { useEffect, useRef, useState } from "react";
import { universitiesByPrefecture, prefecturesWithUniversities, type University } from "@/data/universities";

export function JapanMap() {
  const [svgContent, setSvgContent] = useState<string>("");
  const [hoveredPrefecture, setHoveredPrefecture] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // SVGファイルを読み込む
  useEffect(() => {
    fetch("/japan-map.svg")
      .then((res) => res.text())
      .then((svg) => {
        setSvgContent(svg);
      });
  }, []);

  // 実績のある都道府県を緑色で塗る
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    const container = containerRef.current;
    const svgElement = container.querySelector("svg.geolonia-svg-map");
    if (!svgElement) return;

    // すべての都道府県要素を取得
    const prefectures = svgElement.querySelectorAll(".prefecture");

    prefectures.forEach((pref) => {
      const prefCode = pref.getAttribute("data-code");
      if (!prefCode) return;

      const element = pref as SVGElement;
      const hasUniversity = prefecturesWithUniversities.includes(prefCode);

      // 色を設定する関数
      const setColors = () => {
        if (hasUniversity) {
          element.style.fill = "oklch(0.75 0.15 160)";
          element.style.stroke = "oklch(0.55 0.12 160)";
          element.style.strokeWidth = "1.8";
          element.style.cursor = "pointer";
        } else {
          element.style.fill = "#EEEEEE";
          element.style.stroke = "#CCCCCC";
          element.style.strokeWidth = "1";
          element.style.cursor = "default";
        }
      };

      // 初期色を設定
      setColors();

      // マウスオーバーイベント
      element.addEventListener("mouseenter", (e: Event) => {
        const mouseEvent = e as MouseEvent;
        if (hasUniversity) {
          setHoveredPrefecture(prefCode);
          setTooltipPosition({ x: mouseEvent.clientX, y: mouseEvent.clientY });
        }
      });

      element.addEventListener("mousemove", (e: Event) => {
        const mouseEvent = e as MouseEvent;
        if (hasUniversity) {
          setTooltipPosition({ x: mouseEvent.clientX, y: mouseEvent.clientY });
        }
      });

      element.addEventListener("mouseleave", () => {
        setHoveredPrefecture(null);
        // 色を元に戻す
        setColors();
      });

      // タッチイベント（モバイル対応）
      element.addEventListener("touchstart", (e: Event) => {
        e.preventDefault();
        const touchEvent = e as TouchEvent;
        if (hasUniversity) {
          const touch = touchEvent.touches[0];
          setHoveredPrefecture(prefCode);
          setTooltipPosition({ x: touch.clientX, y: touch.clientY });
        }
      });

      // タッチ終了時も色を維持
      element.addEventListener("touchend", () => {
        setColors();
      });
    });

    // 地図の外をタップしたらツールチップを閉じる
    const handleOutsideTouch = (e: TouchEvent) => {
      const target = e.target as Element;
      if (!target.closest('.prefecture')) {
        setHoveredPrefecture(null);
      }
    };

    document.addEventListener('touchstart', handleOutsideTouch);

    return () => {
      document.removeEventListener('touchstart', handleOutsideTouch);
    };
  }, [svgContent]);

  const hoveredUniversities: University[] = hoveredPrefecture
    ? universitiesByPrefecture[hoveredPrefecture] || []
    : [];

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="w-full max-w-3xl mx-auto"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {/* ツールチップ */}
      {hoveredPrefecture && hoveredUniversities.length > 0 && (
        <>
          {/* 背景オーバーレイ（タップで閉じる） */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setHoveredPrefecture(null)}
          />
          
          <div
            className="fixed z-50 bg-white border-2 border-primary rounded-lg shadow-xl p-4 max-w-sm"
            style={{
              left: `${tooltipPosition.x + 15}px`,
              top: `${tooltipPosition.y + 15}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-bold text-lg mb-2 text-primary">
              {hoveredUniversities[0].prefecture}
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              実績: {hoveredUniversities.length}校
            </p>
            <ul className="text-sm space-y-1">
              {hoveredUniversities.map((uni, idx) => (
                <li key={idx} className="text-foreground">
                  • {uni.name}
                </li>
              ))}
            </ul>
            
            {/* モバイル用の閉じるボタン */}
            <button
              className="mt-3 w-full py-2 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium md:hidden"
              onClick={() => setHoveredPrefecture(null)}
            >
              閉じる
            </button>
          </div>
        </>
      )}
    </div>
  );
}
