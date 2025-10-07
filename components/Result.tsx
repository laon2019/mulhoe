"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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

export const ResultComponent = ({ resultText, onRestart }: { resultText: string; onRestart: () => void }) => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mapping of results to routes and details
  const resultToRoute: { [key: string]: string } = {
    속초파: "/sokcho",
    포항파: "/pohang",
    강릉파: "/gangneung",
    울진파: "/uljin",
    제주된장파: "/jeju-doenjang",
    삼척파: "/samcheok",
    자리물회파: "/jari-mulhoe",
    남해파: "/namhae",
  };

  const resultDetails: { [key: string]: { emoji: string; color: string; image: string } } = {
    속초파: { emoji: "🩵", color: "#3B82F6", image: "/imgs/SokchoPa.png" },
    포항파: { emoji: "❤️", color: "#EF4444", image: "/imgs/PohangPa.png" },
    강릉파: { emoji: "💖", color: "#EC4899", image: "/imgs/GangneungPa.png" },
    울진파: { emoji: "💜", color: "#8B5CF6", image: "/imgs/UljinPa.png" },
    제주된장파: { emoji: "🤎", color: "#8D5524", image: "/imgs/JejuDoenjangPa.png" },
    삼척파: { emoji: "🤍", color: "#6B7280", image: "/imgs/SamcheokPa.png" },
    자리물회파: { emoji: "💛", color: "#D97706", image: "/imgs/JariMulhoePa.png" },
    남해파: { emoji: "💚", color: "#10B981", image: "/imgs/NamhaePa.png" },
  };

  // Initialize Kakao SDK
  useEffect(() => {
    const initKakaoSDK = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY); // Replace with your Kakao JS key
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

      return () => {
        const scripts = document.head.getElementsByTagName("script");
        for (let i = 0; i < scripts.length; i++) {
          if (scripts[i].src.includes("kakao_js_sdk")) {
            document.head.removeChild(scripts[i]);
            break;
          }
        }
      };
    }
  }, []);

  const handleNavigate = () => {
    const route = resultToRoute[resultText];
    if (route) {
      router.push(route);
    }
  };

  const handleKakaoShare = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      toast.error("카카오 공유 기능을 사용할 수 없습니다.", {
        duration: 2000,
      });
      return;
    }

    const imageUrl = resultDetails[resultText]?.image || "/imgs/default.png"; // Fallback image
    const canvas = canvasRef.current;
    if (canvas) {
      const img = new Image();
      img.src = `https://mulhoe.vercel.app${imageUrl}`; // Full URL for the image
      img.crossOrigin = "anonymous"; // Handle CORS if needed
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], `${resultText}.png`, {
                type: "image/png",
                lastModified: Date.now(),
              });
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(file);

              window.Kakao.Share.uploadImage({
                file: dataTransfer.files,
              })
                .then((response: any) => {
                  try {
                    window.Kakao.Share.sendCustom({
                      templateId: 115327, // Replace with your Kakao template ID
                      templateArgs: {
                        title: "내 물회 취향 테스트 결과!",
                        description: `내 물회 취향은 ${resultText}! 너도 테스트 해봐!`,
                        image: response.infos.original.url,
                        shareUrl: "https://mulhoe.vercel.app/",
                      },
                    });
                  } catch (error) {
                    // Fallback to sendDefault
                    window.Kakao.Link.sendDefault({
                      objectType: "feed",
                      content: {
                        title: "내 물회 취향 테스트 결과!",
                        description: `내 물회 취향은 ${resultText}! 너도 테스트 해봐!`,
                        imageUrl: `https://mulhoe.vercel.app${imageUrl}`,
                        link: {
                          mobileWebUrl: "https://mulhoe.vercel.app/",
                          webUrl: "https://mulhoe.vercel.app/",
                        },
                      },
                      buttons: [
                        {
                          title: "테스트 하러 가기",
                          link: {
                            mobileWebUrl: "https://mulhoe.vercel.app/",
                            webUrl: "https://mulhoe.vercel.app/",
                          },
                        },
                      ],
                    });
                  }
                })
                .catch((error: any) => {
                  console.error("Kakao image upload error:", error);
                  toast.error("이미지 업로드 중 오류가 발생했습니다.", {
                    duration: 2000,
                  });
                });
            } else {
              console.error("Canvas returned null for Blob");
              toast.error("이미지 처리 중 오류가 발생했습니다.", {
                duration: 2000,
              });
            }
          }, "image/png");
        }
      };
      img.onerror = () => {
        toast.error("이미지 로드 중 오류가 발생했습니다.", {
          duration: 2000,
        });
      };
    } else {
      // Fallback to sendDefault without image upload
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "내 물회 취향 테스트 결과!",
          description: `내 물회 취향은 ${resultText}! 너도 테스트 해봐!`,
          imageUrl: `https://mulhoe.vercel.app${imageUrl}`,
          link: {
            mobileWebUrl: "https://mulhoe.vercel.app/",
            webUrl: "https://mulhoe.vercel.app/",
          },
        },
        buttons: [
          {
            title: "테스트 하러 가기",
            link: {
              mobileWebUrl: "https://mulhoe.vercel.app/",
              webUrl: "https://mulhoe.vercel.app/",
            },
          },
        ],
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

  const { emoji, color } = resultDetails[resultText] || { emoji: "❓", color: "#6B7280" };

  return (
    <div className="w-full h-[100svh] flex flex-col items-center justify-center bg-gradient-to-b from-[#1E3A8A] to-[#3B82F6] text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg"
      >
        <h1 className="text-4xl font-bold mb-4" style={{ color }}>
          {emoji} 내 물회 취향은 <span className="underline">{resultText}</span>!
        </h1>
        <p className="text-lg mb-6">
          결과를 확인하여 당신에게 맞는 물회 스타일을 알아보세요!
        </p>
        <div className="flex flex-col gap-4 items-center">
          <GradientButton variant="primary" size="lg" onClick={handleNavigate}>
            결과 상세 보기
          </GradientButton>
          <GradientButton variant="secondary" size="lg" onClick={onRestart}>
            다시 시작
          </GradientButton>
          <div className="flex gap-4">
            <button
              onClick={handleCopyLink}
              className="rounded-full bg-gray-100 p-3 flex justify-center items-center transition-transform hover:scale-110 active:scale-95"
            >
              <FaLink className="w-8 h-8 text-gray-600" />
            </button>
            <button
              onClick={handleKakaoShare}
              className="rounded-full bg-yellow-400 p-3 flex justify-center items-center transition-transform hover:scale-110 active:scale-95"
            >
              <RiKakaoTalkFill className="w-8 h-8 text-black" />
            </button>
          </div>
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </motion.div>
    </div>
  );
};