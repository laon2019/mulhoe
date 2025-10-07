"use client";

import React from "react";
import { motion } from "framer-motion";

const GangneungPa = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FCE7F3] to-[#FBCFE8] text-gray-800 px-6">
      {/* 제목 */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-4 text-[#EC4899]"
      >
        💖 강릉파
      </motion.h1>

      {/* 설명 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center max-w-lg bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg"
      >
        <p className="text-lg mb-2 font-semibold text-[#BE185D]">
          밸런스 새콤달콤형
        </p>
        <p className="text-base text-gray-700 mb-4">
          균형‧새콤달콤 맛으로{" "}
          <span className="font-medium text-[#EC4899]">강릉</span>에서 즐겨요.
        </p>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#F472B6] to-transparent mb-4"></div>

        <p className="text-base text-gray-800 leading-relaxed">
          중간맛으로 누구나 부담 없이 즐길 수 있는{" "}
          <span className="font-semibold text-[#EC4899]">물회</span>.
          <br />
          새콤달콤의 완벽한 조화 🍧
        </p>
      </motion.div>

      {/* 비교 설명 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8 text-sm text-gray-600 bg-white/40 px-4 py-2 rounded-xl shadow-md"
      >
        🩵 속초파와 밸런스형 친구!  
        <br />
        강릉파는 <span className="font-semibold text-[#EC4899]">균형감 중심</span>,  
        속초파는 <span className="font-semibold text-[#3B82F6]">단짠 중심</span>
      </motion.div>
    </div>
  );
};

export default GangneungPa;