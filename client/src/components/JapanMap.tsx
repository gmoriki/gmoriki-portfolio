import { useState } from "react";
import { universities } from "@/data/universities";

export function JapanMap() {
  const [hoveredUniversity, setHoveredUniversity] = useState<string | null>(null);

  // 日本の緯度経度範囲: 北緯24-46度、東経123-146度
  const minLat = 24;
  const maxLat = 46;
  const minLng = 123;
  const maxLng = 146;

  // 緯度経度をSVG座標に変換
  const latLngToXY = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 700 + 50;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 500 + 50;
    return { x, y };
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* SVG Map Container */}
      <div className="relative">
        <svg 
          viewBox="0 0 800 600" 
          className="w-full h-auto"
          style={{ maxHeight: "500px" }}
        >
          {/* Background Japan Map */}
          <image 
            href="/japan-map.jpg" 
            width="800" 
            height="600"
            opacity="0.15"
          />
          
          {/* University markers */}
          {universities.map((uni, index) => {
            const { x, y } = latLngToXY(uni.lat, uni.lng);
            const isHovered = hoveredUniversity === uni.name;
            
            return (
              <g 
                key={index}
                onMouseEnter={() => setHoveredUniversity(uni.name)}
                onMouseLeave={() => setHoveredUniversity(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Pulse animation */}
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill="oklch(0.35 0.08 160)"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    from="8"
                    to="16"
                    dur="2s"
                    begin={`${index * 0.1}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.3"
                    to="0"
                    dur="2s"
                    begin={`${index * 0.1}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                
                {/* Main marker */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? "8" : "6"}
                  fill={isHovered ? "oklch(0.25 0.08 160)" : "oklch(0.35 0.08 160)"}
                  stroke="white"
                  strokeWidth="2"
                  opacity="0.9"
                />
                
                {/* Tooltip */}
                {isHovered && (
                  <g>
                    <rect
                      x={x + 15}
                      y={y - 30}
                      width="200"
                      height="50"
                      fill="oklch(0.2 0 0)"
                      rx="4"
                      opacity="0.95"
                    />
                    <text
                      x={x + 20}
                      y={y - 12}
                      fill="white"
                      fontSize="14"
                      fontWeight="600"
                    >
                      {uni.name}
                    </text>
                    <text
                      x={x + 20}
                      y={y - 0}
                      fill="oklch(0.7 0 0)"
                      fontSize="11"
                    >
                      {uni.event}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "oklch(0.35 0.08 160)" }}></div>
        <span>講演・研修実績のある大学（{universities.length}校）</span>
      </div>
    </div>
  );
}
