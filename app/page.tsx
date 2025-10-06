"use client";

import { useState } from "react";
import { GradientButton } from "@/components/Button";
import Image from "next/image";
import { motion } from "framer-motion";

// Components
const StartComponent = ({ onStart }: { onStart: () => void }) => {
  const bubbles = Array.from({ length: 100 }).map(() => ({
    left: Math.random() * 100,
    size: Math.random() * 12 + 6,
    delay: Math.random() * 10,
    duration: Math.random() * 10 + 5,
    opacity: Math.random() * 0.5 + 0.3,
  }));

  return (
    <div className="w-full h-[100svh] bg-gradient-to-b from-[#1E3A8A] to-[#3B82F6] overflow-hidden relative">
      {/* 상단 제목 + 물방울 */}
      <header className="py-12 text-center relative z-20">
        {/* 물방울 */}
        {bubbles.map((bubble, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
              bottom: -bubble.size,
              background: `rgba(255, 255, 255, ${bubble.opacity})`,
            }}
            animate={{ bottom: "110%", opacity: [0, bubble.opacity, 0] }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "linear",
            }}
          />
        ))}
        <motion.div
          className="absolute left-4 top-1/4 w-40 h-40"
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/imgs/squid.svg" alt="squid" width={128} height={128} />
        </motion.div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 150" className="mx-auto">
          <defs>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B9D" />
              <stop offset="50%" stopColor="#FEC163" />
              <stop offset="100%" stopColor="#FFD93D" />
            </linearGradient>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#FF6B9D" floodOpacity="0.3" />
            </filter>
          </defs>

          <rect width="100%" height="100%" fill="transparent" />

          <text
            x="50%" y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Dongle, sans-serif"
            fontSize="72"
            fill="none"
            stroke="#FF6B9D"
            strokeWidth="8"
            strokeLinejoin="round"
            filter="url(#shadow)"
            paintOrder="stroke fill"
          >
            물회의 취향
          </text>

          <text
            x="50%" y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Dongle, sans-serif"
            fontSize="72"
            fill="url(#textGradient)"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinejoin="round"
            paintOrder="stroke fill"
          >
            물회의 취향
          </text>
        </svg>
        <motion.div
          className="absolute -right-2 top-1/3 w-40 h-40"
          animate={{ rotate: [10, -10, 10] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/imgs/abalone.svg" alt="abalone" width={128} height={128} />
        </motion.div>
        <p className="text-white/80 mt-2 text-lg">
          나의 취향을 알아보는 재미있는 테스트!
        </p>
      </header>

      {/* 중간 이미지 + 해산물 */}
      <main className="flex-1 flex items-center justify-center w-full relative z-10">
        <div className="relative w-64 h-64">
          <Image
            src="/imgs/start2.png"
            alt="중간 이미지"
            width={256}
            height={256}
            className="rounded-2xl shadow-2xl object-cover relative z-10"
          />
        </div>
      </main>

      {/* 시작 버튼 */}
      <section className="py-16 w-full flex justify-center relative z-20">
        <GradientButton variant="primary" size="lg" className="w-full max-w-[300px]" onClick={onStart}>
          시작하기
        </GradientButton>
      </section>
    </div>
  );
};

const ProcessComponent = ({ currentPage, answers, handleAnswer }: { currentPage: number; answers: { [key: number]: number }; handleAnswer: (choice: number) => void }) => {
  const questions = [
    { id: 1, text: "물회는 어떤 방식이 더 좋나요?", optionA: "얼음 육수에 말아 한입에 시원하게 ❄️", optionB: "비빔냉면처럼 새콤하게 비벼 먹는 게 좋아 🥢", resultA: "속초파", resultB: "포항파", score: 1.15 },
    { id: 2, text: "한입 먹었을 때 더 끌리는 맛은?", optionA: "새콤달콤, 균형 잡힌 냉면 같은 맛 🍋", optionB: "칼칼하고 감칠맛 강한 비빔형 🌶️", resultA: "강릉파", resultB: "울진파", score: 1.15 },
    { id: 3, text: "한 끼 식사로 물회를 고른다면?", optionA: "된장국처럼 구수하고 든든하게 🍲", optionB: "시원하고 깔끔한 육수로 가볍게 💧", resultA: "제주된장파", resultB: "속초파", score: 1.15 },
    { id: 4, text: "양념의 기본은?", optionA: "소금과 식초로 맑고 투명하게 💧", optionB: "사이다+고추장 조합의 달콤자극형 🍯", resultA: "삼척파", resultB: "강릉파", score: 1 },
    { id: 5, text: "바다 향은 어느 쪽이 더 좋아요?", optionA: "짭조름한 소금기와 바다 냄새가 진한 쪽 🌊", optionB: "멍게·전복의 해산물 향이 강한 쪽 🐚", resultA: "자리물회파", resultB: "남해파", score: 1 },
    { id: 6, text: "식감으로 본다면?", optionA: "쫄깃한 회의 식감이 중요해 🐟", optionB: "부드럽고 향미가 있는 해산물이 좋아 🐚", resultA: "울진파", resultB: "남해파", score: 1 },
    { id: 7, text: "밥은 어떻게 먹는 게 좋아요?", optionA: "밥 말아 한 끼로 든든하게 🍚", optionB: "밥 없이 회와 육수만 시원하게 ❄️", resultA: "제주된장파", resultB: "삼척파", score: 1 },
    { id: 8, text: "여름에 물회를 먹는 이유는?", optionA: "단맛과 얼음육수의 시원함이 좋아 🍯", optionB: "단맛 없이 바다 본연의 맛을 느끼고 싶어 🌊", resultA: "속초파", resultB: "자리물회파", score: 1 },
    { id: 9, text: "함께 먹는다면?", optionA: "친구들과 해변 포차에서 신나게 🍻", optionB: "조용한 바닷가에서 혼자 여유롭게 🌾", resultA: "강릉파", resultB: "삼척파", score: 0.9 },
    { id: 10, text: "매운맛에 대한 생각은?", optionA: "적당한 새콤함이면 충분해 🌶️❌", optionB: "확실히 칼칼하게 매운 게 좋아 🔥", resultA: "강릉파", resultB: "포항파", score: 0.9 },
    { id: 11, text: "음식의 비주얼이 중요하다면?", optionA: "투명한 국물과 맑은 색감이 좋아 💧", optionB: "양념이 진하고 붉은 색이 맛있어 보여 ❤️‍🔥", resultA: "삼척파", resultB: "포항파", score: 0.9 },
    { id: 12, text: "가장 끌리는 조합은?", optionA: "된장+해산물의 구수한 풍미 🍲", optionB: "고추장+식초의 새콤한 자극 🌶️", resultA: "제주된장파", resultB: "울진파", score: 0.9 },
  ];

  const currentQuestion = questions[currentPage];
  return (
    <div className="w-full h-[100svh] bg-gradient-to-b from-[#1E3A8A] to-[#3B82F6] flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-6">물회의 취향 검사</h1>
      <p className="text-4xl text-center mb-8">{currentQuestion.text}</p>
      <div className="flex flex-col items-center space-y-4">
        <GradientButton variant="primary" size="md" onClick={() => handleAnswer(0)}>
          {currentQuestion.optionA}
        </GradientButton>
        <GradientButton variant="primary" size="md" onClick={() => handleAnswer(1)}>
          {currentQuestion.optionB}
        </GradientButton>
      </div>
      <p className="mt-4 text-sm">페이지 {currentPage + 1} / 12</p>
    </div>
  );
};

const ResultComponent = ({ resultText, onRestart }: { resultText: string; onRestart: () => void }) => (
  <div className="w-full h-[100svh] bg-gradient-to-b from-[#1E3A8A] to-[#3B82F6] flex flex-col items-center justify-center text-white">
    <h1 className="text-4xl font-bold mb-4">결과</h1>
    <p className="text-center text-4xl max-w-md mb-8">{resultText}</p>
    <GradientButton variant="primary" size="lg" onClick={onRestart}>
      다시 시작
    </GradientButton>
  </div>
);

// Main Component
export default function Home() {
  const [currentState, setCurrentState] = useState<"start" | "process" | "result">("start");
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [resultText, setResultText] = useState<string>("");

  // Define result keys as a type
  type ResultKey = "속초파" | "포항파" | "강릉파" | "울진파" | "제주된장파" | "삼척파" | "자리물회파" | "남해파";
  const results: Record<ResultKey, string> = {
    속초파: "속초파 유형: 당신은 시원한 얼음 육수와 맑은 맛을 사랑하는 스타일! 해양 심포니와 함께 잔잔한 바다를 즐기세요.",
    포항파: "포항파 유형: 새콤달콤한 비빔 스타일에 끌리는 당신! 활기찬 바닷가에서 친구들과 즐거운 시간을 보내세요.",
    강릉파: "강릉파 유형: 균형 잡힌 맛과 여유로운 분위기를 선호하는 당신! 조용한 해변에서 휴식을 취해보세요.",
    울진파: "울진파 유형: 칼칼하고 감칠맛 나는 맛을 좋아하는 당신! 모험적인 바다 탐험을 추천드려요.",
    제주된장파: "제주된장파 유형: 구수한 된장과 든든함을 즐기는 당신! 아침 바다에서 힐링하세요.",
    삼척파: "삼척파 유형: 깔끔한 육수와 맑은 색감을 선호하는 당신! 혼자서 조용히 바다를 만끽하세요.",
    자리물회파: "자리물회파 유형: 짭조름한 바다 냄새와 쫄깃한 식감을 사랑하는 당신! 자연 속에서 자유를 느껴보세요.",
    남해파: "남해파 유형: 부드럽고 향미로운 해산물을 즐기는 당신! 저녁 바다에서 낭만을 만끽하세요.",
  };

  const handleAnswer = (choice: number) => {
    const newAnswers = { ...answers, [currentPage]: choice };
    setAnswers(newAnswers);

    if (currentPage < 11) {
      setCurrentPage(currentPage + 1);
    } else {
      // Calculate results
      const scores: Record<ResultKey, number> = {
        속초파: 0, 포항파: 0, 강릉파: 0, 울진파: 0, 제주된장파: 0, 삼척파: 0, 자리물회파: 0, 남해파: 0,
      };
      let totalScore = 0;

      for (let i = 0; i < 12; i++) {
        const question = questions[i];
        const answer = newAnswers[i] || 0; // 0 for A, 1 for B
        const score = question.score;
        const resultKey = answer === 0 ? question.resultA : question.resultB;
        scores[resultKey as ResultKey] = (scores[resultKey as ResultKey] || 0) + score;
        totalScore += score;
      }

      const dominantResult = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0] as ResultKey;
      const finalResult = results[dominantResult].replace("{score}", totalScore.toFixed(2));
      setResultText(finalResult); // Update result text state
      setCurrentState("result"); // Move to result state
    }
  };

  const restart = () => {
    setCurrentState("start");
    setCurrentPage(0);
    setAnswers({});
    setResultText(""); // Reset result text
  };

  return (
    <div className="w-full h-[100svh]">
      {(() => {
        switch (currentState) {
          case "start":
            return <StartComponent onStart={() => setCurrentState("process")} />;
          case "process":
            return <ProcessComponent currentPage={currentPage} answers={answers} handleAnswer={handleAnswer} />;
          case "result":
            return <ResultComponent resultText={resultText} onRestart={restart} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

const questions = [
  { id: 1, text: "물회는 어떤 방식이 더 좋나요?", optionA: "얼음 육수에 말아 한입에 시원하게 ❄️", optionB: "비빔냉면처럼 새콤하게 비벼 먹는 게 좋아 🥢", resultA: "속초파", resultB: "포항파", score: 1.15 },
  { id: 2, text: "한입 먹었을 때 더 끌리는 맛은?", optionA: "새콤달콤, 균형 잡힌 냉면 같은 맛 🍋", optionB: "칼칼하고 감칠맛 강한 비빔형 🌶️", resultA: "강릉파", resultB: "울진파", score: 1.15 },
  { id: 3, text: "한 끼 식사로 물회를 고른다면?", optionA: "된장국처럼 구수하고 든든하게 🍲", optionB: "시원하고 깔끔한 육수로 가볍게 💧", resultA: "제주된장파", resultB: "속초파", score: 1.15 },
  { id: 4, text: "양념의 기본은?", optionA: "소금과 식초로 맑고 투명하게 💧", optionB: "사이다+고추장 조합의 달콤자극형 🍯", resultA: "삼척파", resultB: "강릉파", score: 1 },
  { id: 5, text: "바다 향은 어느 쪽이 더 좋아요?", optionA: "짭조름한 소금기와 바다 냄새가 진한 쪽 🌊", optionB: "멍게·전복의 해산물 향이 강한 쪽 🐚", resultA: "자리물회파", resultB: "남해파", score: 1 },
  { id: 6, text: "식감으로 본다면?", optionA: "쫄깃한 회의 식감이 중요해 🐟", optionB: "부드럽고 향미가 있는 해산물이 좋아 🐚", resultA: "울진파", resultB: "남해파", score: 1 },
  { id: 7, text: "밥은 어떻게 먹는 게 좋아요?", optionA: "밥 말아 한 끼로 든든하게 🍚", optionB: "밥 없이 회와 육수만 시원하게 ❄️", resultA: "제주된장파", resultB: "삼척파", score: 1 },
  { id: 8, text: "여름에 물회를 먹는 이유는?", optionA: "단맛과 얼음육수의 시원함이 좋아 🍯", optionB: "단맛 없이 바다 본연의 맛을 느끼고 싶어 🌊", resultA: "속초파", resultB: "자리물회파", score: 1 },
  { id: 9, text: "함께 먹는다면?", optionA: "친구들과 해변 포차에서 신나게 🍻", optionB: "조용한 바닷가에서 혼자 여유롭게 🌾", resultA: "강릉파", resultB: "삼척파", score: 0.9 },
  { id: 10, text: "매운맛에 대한 생각은?", optionA: "적당한 새콤함이면 충분해 🌶️❌", optionB: "확실히 칼칼하게 매운 게 좋아 🔥", resultA: "강릉파", resultB: "포항파", score: 0.9 },
  { id: 11, text: "음식의 비주얼이 중요하다면?", optionA: "투명한 국물과 맑은 색감이 좋아 💧", optionB: "양념이 진하고 붉은 색이 맛있어 보여 ❤️‍🔥", resultA: "삼척파", resultB: "포항파", score: 0.9 },
  { id: 12, text: "가장 끌리는 조합은?", optionA: "된장+해산물의 구수한 풍미 🍲", optionB: "고추장+식초의 새콤한 자극 🌶️", resultA: "제주된장파", resultB: "울진파", score: 0.9 },
];