"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { GradientButton } from "./Button";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaLink } from "react-icons/fa";
import toast from "react-hot-toast";

declare global {
  interface Window {
    Kakao?: any;
  }
}

export const ResultComponent = ({
  resultText,
  mulhoeType,
  onRestart,
}: {
  resultText: string;
  mulhoeType: string;
  onRestart: () => void;
}) => {
  // Mapping of English mulhoeType to Korean display names
  const mulhoeTypeToKorean: { [key: string]: string } = {
    SokchoPa: "속초파",
    PohangPa: "포항파",
    GangneungPa: "강릉파",
    JejuDoenjangPa: "제주된장파",
    JariMulhoePa: "자리물회파",
    NamhaePa: "남해파",
  };

  // Mapping of mulhoeType to details
  const resultDetails: { [key: string]: { emoji: string; image: string } } = {
    SokchoPa: { emoji: "🩵", image: "/imgs/default.png" },
    PohangPa: { emoji: "❤️", image: "/imgs/default.png" },
    GangneungPa: { emoji: "💖", image: "/imgs/default.png" },
    JejuDoenjangPa: { emoji: "🤎", image: "/imgs/default.png" },
    JariMulhoePa: { emoji: "💛", image: "/imgs/default.png" },
    NamhaePa: { emoji: "💚", image: "/imgs/default.png" },
  };

  useEffect(() => {
    const initKakaoSDK = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.cleanup();
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
      }
    };

    if (window.Kakao) {
      initKakaoSDK();
    } else {
      const script = document.createElement("script");
      script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.0/kakao.min.js";
      script.async = true;
      script.onload = initKakaoSDK;
      document.head.appendChild(script);
    }

    return () => {
      const scripts = document.head.getElementsByTagName("script");
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes("kakao_js_sdk")) {
          document.head.removeChild(scripts[i]);
          break;
        }
      }
    };
  }, []);

  const handleKakaoShare = () => {
    if (!window.Kakao || !window.Kakao.Share) {
      toast.error("카카오 공유 기능을 사용할 수 없습니다.", {
        duration: 2000,
      });
      return;
    }

    try {
      const shareTitle = "내 물회 취향 테스트 결과!";
      const shareDescription = `내 물회 취향은 ${mulhoeTypeToKorean[mulhoeType] || mulhoeType}! 너도 테스트 해봐!`;
      const shareUrl = "https://mulhoe.vercel.app/";
      const imageUrl = resultDetails[mulhoeType]?.image || "/imgs/default.png";
      const fullImageUrl = `https://mulhoe.vercel.app${imageUrl}`;

      window.Kakao.Share.sendCustom({
        templateId: 124927,
        templateArgs: {
          title: shareTitle,
          description: shareDescription,
          image: fullImageUrl,
          shareUrl: shareUrl,
        },
      });
    } catch (error) {
      console.error("Kakao share error:", error);
      toast.error("공유 중 문제가 발생했습니다.", {
        duration: 2000,
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText("https://mulhoe.vercel.app/")
      .then(() => {
        toast.success("링크가 클립보드에 복사되었습니다.", {
          duration: 2000,
        });
      })
      .catch(() => {
        toast.error("링크 복사 중 오류가 발생했습니다.", {
          duration: 2000,
        });
      });
  };

  const { emoji, image } = resultDetails[mulhoeType] || { emoji: "❓", image: "" };
  const displayMulhoeType = mulhoeTypeToKorean[mulhoeType] || mulhoeType; // Use Korean name for display

  return (
    <div className="w-full min-h-[100svh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Image Section */}
          {image && (
            <div className="relative w-full aspect-square bg-gradient-to-br from-blue-100 to-blue-50">
              <img
                src={image}
                alt={displayMulhoeType}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content Section */}
          <div className="p-8 space-y-6">
            {/* Result Text */}
            <div className="text-center space-y-3">
              <div className="text-5xl mb-2">{emoji}</div>
              <h1 className="text-2xl font-bold text-gray-900">
                내 물회 취향은
              </h1>
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
                <span className="text-2xl font-bold text-white">{displayMulhoeType}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-center text-2xl font-bold text-gray-600 leading-relaxed px-2">
              {resultText}
            </p>

            {/* Buttons */}
            <div className="space-y-3 pt-2">
              <GradientButton
                variant="secondary"
                size="sm"
                onClick={onRestart}
                className="w-full"
              >
                다시 테스트하기
              </GradientButton>

              {/* Share Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-110 active:scale-95"
                  aria-label="링크 복사"
                >
                  <FaLink className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={handleKakaoShare}
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-all duration-200 hover:scale-110 active:scale-95"
                  aria-label="카카오톡 공유"
                >
                  <RiKakaoTalkFill className="w-6 h-6 text-gray-900" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          친구들과 결과를 공유해보세요 ✨
        </motion.p>
      </motion.div>
    </div>
  );
};