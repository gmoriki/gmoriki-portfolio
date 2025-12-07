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

  // 都道府県にスタイルを適用する関数
  const applyStyles = () => {
    const container = containerRef.current;
    if (!container) return false;

    const svgElement = container.querySelector("svg.geolonia-svg-map");
    if (!svgElement) return false;

    const prefectures = svgElement.querySelectorAll(".prefecture");
    if (prefectures.length === 0) return false;

    prefectures.forEach((pref) => {
      const prefCode = pref.getAttribute("data-code");
      if (!prefCode) return;

      const element = pref as SVGElement;
      const hasUniversity = prefecturesWithUniversities.includes(prefCode);

      // 実績のある都道府県は緑色、それ以外はグレー
      if (hasUniversity) {
        element.setAttribute("fill", "oklch(0.75 0.15 160)");
        element.setAttribute("stroke", "oklch(0.55 0.12 160)");
        element.setAttribute("stroke-width", "1.8");
        element.style.cursor = "pointer";
      } else {
        element.setAttribute("fill", "#EEEEEE");
        element.setAttribute("stroke", "#CCCCCC");
        element.setAttribute("stroke-width", "1");
        element.style.cursor = "default";
      }

      // イベントリスナーが重複しないようにチェック
      if (!element.hasAttribute("data-listeners-attached")) {
        element.setAttribute("data-listeners-attached", "true");

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
      }
    });

    return true;
  };

  // SVGが読み込まれたらスタイルを適用
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    // 初回適用を試みる
    const tryApply = () => {
      const success = applyStyles();
      if (!success) {
        // 失敗した場合は少し待ってから再試行
        setTimeout(tryApply, 50);
      }
    };

    // DOMの更新を待ってから適用
    setTimeout(tryApply, 0);

    // MutationObserverでDOM変更を監視
    const observer = new MutationObserver(() => {
      applyStyles();
    });

    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [svgContent]);

  // 地図の外をタップしたらツールチップを閉じる
  useEffect(() => {
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
  }, []);

  const hoveredUniversities: University[] = hoveredPrefecture
    ? universitiesByPrefecture[hoveredPrefecture] || []
    : [];

  // ポップアップの位置を計算（画面端で自動調整）
  const getAdjustedTooltipPosition = () => {
    const tooltipWidth = 384; // max-w-sm ≈ 384px
    const tooltipHeight = 300; // 概算高さ
    const padding = 16; // 画面端からのパディング

    let left = tooltipPosition.x + 15;
    let top = tooltipPosition.y + 15;

    // 右側がはみ出す場合は左側に配置
    if (left + tooltipWidth + padding > window.innerWidth) {
      left = Math.max(padding, tooltipPosition.x - tooltipWidth - 15);
    }

    // 下側がはみ出す場合は上側に配置
    if (top + tooltipHeight + padding > window.innerHeight) {
      top = Math.max(padding, tooltipPosition.y - tooltipHeight - 15);
    }

    return { left, top };
  };

  const adjustedPosition = getAdjustedTooltipPosition();

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
              left: `${adjustedPosition.left}px`,
              top: `${adjustedPosition.top}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-bold text-lg mb-2 text-primary">
              {hoveredUniversities[0].prefecture}
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              実績: {hoveredUniversities.length}校
            </p>
            <ul className="text-sm space-y-2">
              {hoveredUniversities.map((uni, idx) => (
                <li key={idx} className="text-foreground">
                  <div className="font-semibold">• {uni.name}</div>
                  <div className="text-xs text-muted-foreground ml-3">{uni.title}</div>
                  <div className="text-xs text-muted-foreground ml-3">{uni.date}</div>
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
