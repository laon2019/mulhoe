"use client";

import React from "react";
import { motion } from "framer-motion";

const JejuDoenjangPa = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F5F5F4] to-[#E7E5E4] text-gray-800 px-6">
      {/* 제목 */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-4 text-[#8D5524]"
      >
        🤎 제주된장파
      </motion.h1>

      {/* 설명 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center max-w-lg bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg"
      >
        <p className="text-lg mb-2 font-semibold text-[#5C4033]">
          구수든든 한 끼형
        </p>
        <p className="text-base text-gray-700 mb-4">
          구수‧된장‧식사형 맛으로{" "}
          <span className="font-medium text-[#8D5524]">제주 서쪽</span>에서 사랑받아요.
        </p>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#A18072] to-transparent mb-4"></div>

        <p className="text-base text-gray-800 leading-relaxed">
          밥 말아 먹기 좋은{" "}
          <span className="font-semibold text-[#8D5524]">식사형 물회</span>.
          <br />
          구수하고 든든한 한 끼 🍚
        </p>
      </motion.div>

      {/* 비교 설명 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8 text-sm text-gray-600 bg-white/40 px-4 py-2 rounded-xl shadow-md"
      >
        💚 남해파와 구수함 동료!  
        <br />
        제주된장은 <span className="font-semibold text-[#8D5524]">식사 중심</span>,  
        남해파는 <span className="font-semibold text-[#10B981]">향미 중심</span>
      </motion.div>
    </div>
  );
};

export default JejuDoenjangPa;