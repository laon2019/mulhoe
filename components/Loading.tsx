"use client";

import { useState, useEffect } from "react";
import {
  GiShrimp,
  GiTropicalFish,
  GiSeaStar,
  GiSquid,
} from "react-icons/gi";
import { FaWater } from "react-icons/fa";

const loadingIcons = [
  { icon: GiSquid, color: "#C084FC", label: "오징어" },
  { icon: GiShrimp, color: "#FFB6C1", label: "새우" },
  { icon: GiTropicalFish, color: "#7DD3FC", label: "물고기" },
  { icon: GiSeaStar, color: "#FCA5A5", label: "불가사리" },
];

export default function LoadingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 순환 애니메이션 (0.4초마다 아이콘 교체)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === loadingIcons.length - 1 ? 0 : prev + 1
      );
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = loadingIcons[currentIndex].icon;
  const currentColor = loadingIcons[currentIndex].color;

  return (
    <div className="w-full h-[100svh] flex flex-col items-center justify-center bg-gradient-to-b from-[#1E3A8A] via-[#2563EB] to-[#60A5FA] text-white relative overflow-hidden">
      {/* 🌊 배경 물결 */}
      <div className="absolute inset-0 opacity-30">
        <FaWater className="absolute bottom-0 left-1/4 text-blue-300 text-[200px] animate-pulse" />
        <FaWater className="absolute bottom-10 right-1/4 text-blue-200 text-[160px] animate-pulse" />
      </div>

      <div className="flex flex-col items-center gap-8 z-10">
        <div className="flex items-center justify-center">
          <CurrentIcon
            size={128}
            style={{
              color: currentColor,
              filter: "drop-shadow(0 0 10px rgba(255,255,255,0.8))",
            }}
          />
        </div>

        <span className="text-3xl font-bold tracking-wide">
          당신의 물회 취향은?
        </span>
      </div>
    </div>
  );
}
