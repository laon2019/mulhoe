"use client";

import React from "react";
import { motion } from "framer-motion";

const NamhaePa = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#D1FAE5] to-[#A7F3D0] text-gray-800 px-6">
      {/* 제목 */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-4 text-[#10B981]"
      >
        💚 남해파
      </motion.h1>

      {/* 설명 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center max-w-lg bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg"
      >
        <p className="text-lg mb-2 font-semibold text-[#047857]">
          향미해산물 감각형
        </p>
        <p className="text-base text-gray-700 mb-4">
          향‧해산물‧고소 맛으로{" "}
          <span className="font-medium text-[#10B981]">남해</span>와{" "}
          <span className="font-medium text-[#10B981]">통영</span>에서 인기예요.
        </p>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#34D399] to-transparent mb-4"></div>

        <p className="text-base text-gray-800 leading-relaxed">
          해물 향이 돋보이는{" "}
          <span className="font-semibold text-[#10B981]">감각형 물회</span>.
          <br />
          미식가를 위한 고소한 맛 🦑
        </p>
      </motion.div>

      {/* 비교 설명 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8 text-sm text-gray-600 bg-white/40 px-4 py-2 rounded-xl shadow-md"
      >
        🤎 제주된장파와 향미 동료!  
        <br />
        남해파는 <span className="font-semibold text-[#10B981]">향미 중심</span>,  
        제주된장은 <span className="font-semibold text-[#8D5524]">식사 중심</span>
      </motion.div>
    </div>
  );
};

export default NamhaePa;