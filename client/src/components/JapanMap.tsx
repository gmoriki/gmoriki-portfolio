import { useEffect, useRef, useState } from "react";
import { universities } from "@/data/universities";

export function JapanMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredUniversity, setHoveredUniversity] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // キャンバスサイズを設定
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // 日本地図の描画範囲（緯度経度）
    const minLat = 24; // 沖縄
    const maxLat = 46; // 北海道
    const minLng = 123; // 西端
    const maxLng = 146; // 東端

    // 緯度経度をキャンバス座標に変換
    const latLngToXY = (lat: number, lng: number) => {
      const x = ((lng - minLng) / (maxLng - minLng)) * rect.width;
      const y = ((maxLat - lat) / (maxLat - minLat)) * rect.height;
      return { x, y };
    };

    // 背景を描画
    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // 日本の大まかな輪郭を描画（簡略化）
    ctx.strokeStyle = "#d1d5db";
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    // 簡略化された日本の輪郭（主要な島々）
    const japanOutline = [
      // 本州の大まかな輪郭
      [35.5, 140], [36, 140.5], [37, 138.5], [37.5, 137], 
      [36.5, 136], [35.5, 135.5], [34.5, 135], [34, 136], 
      [33.5, 133], [34, 131], [35, 133], [35.5, 135],
      [36, 136.5], [37, 138], [38, 139.5], [39, 140.5],
      [40, 140.8], [41, 140.5], [40.5, 139.5], [39.5, 139],
      [38.5, 139.5], [37.5, 140], [36.5, 140.5], [35.5, 140]
    ];

    japanOutline.forEach(([lat, lng], i) => {
      const { x, y } = latLngToXY(lat, lng);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // 大学の位置にマーカーを描画
    universities.forEach((uni) => {
      const { x, y } = latLngToXY(uni.lat, uni.lng);
      
      // マーカーの円
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = hoveredUniversity === uni.name ? "#1e40af" : "#3b82f6";
      ctx.fill();
      
      // マーカーの縁
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // パルス効果（アニメーション用）
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

  }, [hoveredUniversity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x: e.clientX, y: e.clientY });

    // マウス位置に近い大学を検出
    const minLat = 24;
    const maxLat = 46;
    const minLng = 123;
    const maxLng = 146;

    const latLngToXY = (lat: number, lng: number) => {
      const canvasX = ((lng - minLng) / (maxLng - minLng)) * rect.width;
      const canvasY = ((maxLat - lat) / (maxLat - minLat)) * rect.height;
      return { x: canvasX, y: canvasY };
    };

    let closestUni: string | null = null;
    let minDistance = Infinity;

    universities.forEach((uni) => {
      const { x: uniX, y: uniY } = latLngToXY(uni.lat, uni.lng);
      const distance = Math.sqrt((x - uniX) ** 2 + (y - uniY) ** 2);
      
      if (distance < 15 && distance < minDistance) {
        closestUni = uni.name;
        minDistance = distance;
      }
    });

    setHoveredUniversity(closestUni);
  };

  const handleMouseLeave = () => {
    setHoveredUniversity(null);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-[400px] cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      {hoveredUniversity && (
        <div
          className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg pointer-events-none"
          style={{
            left: mousePos.x + 10,
            top: mousePos.y + 10,
          }}
        >
          <div className="font-semibold">{hoveredUniversity}</div>
          <div className="text-xs text-gray-300">
            {universities.find(u => u.name === hoveredUniversity)?.event}
          </div>
        </div>
      )}
    </div>
  );
}
