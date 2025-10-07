"use client";

import React from "react";
import { motion } from "framer-motion";

const SokchoPa = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#E0F7FF] to-[#B3E5FC] text-gray-800 px-6">
      {/* 제목 */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-4 text-[#3B82F6]"
      >
        🩵 속초파
      </motion.h1>

      {/* 설명 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center max-w-lg bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg"
      >
        <p className="text-lg mb-2 font-semibold text-[#1E3A8A]">
          시원달콤 얼음육수형
        </p>
        <p className="text-base text-gray-700 mb-4">
          달콤‧시원‧자극적인 맛으로{" "}
          <span className="font-medium text-[#2563EB]">속초</span>와{" "}
          <span className="font-medium text-[#2563EB]">강릉</span>에서 즐겨 먹어요.
        </p>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#60A5FA] to-transparent mb-4"></div>

        <p className="text-base text-gray-800 leading-relaxed">
          청량감과 단짠단초의 조화가 매력적인{" "}
          <span className="font-semibold text-[#3B82F6]">냉육수형 물회</span>.
          <br />
          강릉파보다 약간 더{" "}
          <span className="font-semibold text-[#2563EB]">달콤한</span> 편이에요 💦
        </p>
      </motion.div>

      {/* 비교 설명 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8 text-sm text-gray-600 bg-white/40 px-4 py-2 rounded-xl shadow-md"
      >
        💖 강릉파와 함께 냉육수 기반!  
        <br />
        속초파는 <span className="font-semibold text-[#3B82F6]">단짠 중심</span>,  
        강릉파는 <span className="font-semibold text-[#EC4899]">균형감 중심</span>
      </motion.div>
    </div>
  );
};

export default SokchoPa;
