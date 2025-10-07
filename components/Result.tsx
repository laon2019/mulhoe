"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaLink } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";

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
  const resultDetails: { [key: string]: { emoji: string; image: string; shareImage: string } } = {
    SokchoPa: { emoji: "🩵", image: "/imgs/SokchoPa.svg", shareImage: "/imgs/SokchoPa.png" },
    PohangPa: { emoji: "❤️", image: "/imgs/PohangPa.svg", shareImage: "/imgs/PohangPa.png" },
    GangneungPa: { emoji: "💖", image: "/imgs/GangneungPa.svg", shareImage: "/imgs/GangneungPa.png" },
    JejuDoenjangPa: { emoji: "🤎", image: "/imgs/JejuDoenjangPa.svg", shareImage: "/imgs/JejuDoenjangPa.png" },
    JariMulhoePa: { emoji: "💛", image: "/imgs/JariMulhoePa.svg", shareImage: "/imgs/JariMulhoePa.png" },
    NamhaePa: { emoji: "💚", image: "/imgs/NamhaePa.svg", shareImage: "/imgs/NamhaePa.png" },
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
      const imageUrl = resultDetails[mulhoeType]?.shareImage || "/imgs/default.jpeg";
      const fullImageUrl = `https://mulhoe.vercel.app${imageUrl}`;

      // 디버깅을 위한 로그 추가
      console.log("Share attempt:", { shareTitle, shareDescription, shareUrl, fullImageUrl });

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
      toast.error(`공유 중 문제가 발생했습니다`, {
        duration: 3000,
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

  const { emoji, image, shareImage } = resultDetails[mulhoeType] || { emoji: "❓", image: "", shareImage: "" };
  const displayMulhoeType = mulhoeTypeToKorean[mulhoeType] || mulhoeType;

  return (
    <div className="w-full min-h-[100svh] flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 flex flex-col"
      >
        {/* Image Section - Full Width */}
        {image && (
          <div className="flex-1 flex items-center justify-center w-full p-4">
            <img
              src={image}
              alt={displayMulhoeType}
              className="w-full h-auto max-w-2xl object-contain"
            />
          </div>
        )}

        {/* Buttons Section */}
        <div className="w-full px-6 pb-8 space-y-4">
          {/* Share Buttons */}
          <div className="flex items-center justify-center gap-3">
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
          <div className="flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1, cursor: "pointer" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Image
                src="/imgs/startBtn.svg"
                alt="Start Button"
                width={360}
                height={80}
                className="object-contain"
                onClick={onRestart}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};