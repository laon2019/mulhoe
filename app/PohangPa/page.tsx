"use client";

import React from "react";
import { motion } from "framer-motion";

const PohangPa = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FFE0E0] to-[#FECACA] text-gray-800 px-6">
      {/* 제목 */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-4 text-[#EF4444]"
      >
        ❤️ 포항파
      </motion.h1>

      {/* 설명 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center max-w-lg bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg"
      >
        <p className="text-lg mb-2 font-semibold text-[#B91C1C]">
          새콤감칠 비빔형
        </p>
        <p className="text-base text-gray-700 mb-4">
          새콤‧비빔‧감칠 맛으로{" "}
          <span className="font-medium text-[#EF4444]">포항</span>과{" "}
          <span className="font-medium text-[#EF4444]">울진</span>에서 사랑받아요.
        </p>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#F87171] to-transparent mb-4"></div>

        <p className="text-base text-gray-800 leading-relaxed">
          자극적이고 강한{" "}
          <span className="font-semibold text-[#EF4444]">새콤형 물회</span>.
          <br />
          강렬한 맛으로 입맛을 사로잡아요 🔥
        </p>
      </motion.div>

      {/* 비교 설명 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8 text-sm text-gray-600 bg-white/40 px-4 py-2 rounded-xl shadow-md"
      >
        💜 울진파와 비빔계열 동료!  
        <br />
        포항파는 <span className="font-semibold text-[#EF4444]">강한 새콤함</span>,  
        울진파는 <span className="font-semibold text-[#8B5CF6]">절제된 감칠맛</span>
      </motion.div>
    </div>
  );
};

export default PohangPa;