"use client";

import React from "react";
import { motion } from "framer-motion";

const JariMulhoePa = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FEF9C3] to-[#FEF08A] text-gray-800 px-6">
      {/* 제목 */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-4 text-[#D97706]"
      >
        💛 자리물회파
      </motion.h1>

      {/* 설명 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center max-w-lg bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg"
      >
        <p className="text-lg mb-2 font-semibold text-[#B45309]">
          짭조름 자연주의형
        </p>
        <p className="text-base text-gray-700 mb-4">
          짠맛‧맑은 맛으로{" "}
          <span className="font-medium text-[#D97706]">제주 동쪽</span>과{" "}
          <span className="font-medium text-[#D97706]">삼척</span>에서 즐겨요.
        </p>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FBBF24] to-transparent mb-4"></div>

        <p className="text-base text-gray-800 leading-relaxed">
          단맛 없는{" "}
          <span className="font-semibold text-[#D97706]">순수한 물회</span>.
          <br />
          짭조름한 자연의 맛 🌊
        </p>
      </motion.div>

      {/* 비교 설명 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8 text-sm text-gray-600 bg-white/40 px-4 py-2 rounded-xl shadow-md"
      >
        🤍 삼척파와 청량 동료!  
        <br />
        자리물회는 <span className="font-semibold text-[#D97706]">짠맛 강조</span>,  
        삼척파는 <span className="font-semibold text-[#6B7280]">맑은 청량감</span>
      </motion.div>
    </div>
  );
};

export default JariMulhoePa;