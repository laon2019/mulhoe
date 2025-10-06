"use client";

import { useState } from "react";
import { GradientButton } from "@/components/Button";
import { useRouter } from "next/navigation";

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

const results = {
  속초파: "속초파 유형: 당신은 시원한 얼음 육수와 맑은 맛을 사랑하는 스타일! 해양 심포니와 함께 잔잔한 바다를 즐기세요. 총점: {score}",
  포항파: "포항파 유형: 새콤달콤한 비빔 스타일에 끌리는 당신! 활기찬 바닷가에서 친구들과 즐거운 시간을 보내세요. 총점: {score}",
  강릉파: "강릉파 유형: 균형 잡힌 맛과 여유로운 분위기를 선호하는 당신! 조용한 해변에서 휴식을 취해보세요. 총점: {score}",
  울진파: "울진파 유형: 칼칼하고 감칠맛 나는 맛을 좋아하는 당신! 모험적인 바다 탐험을 추천드려요. 총점: {score}",
  제주된장파: "제주된장파 유형: 구수한 된장과 든든함을 즐기는 당신! 아침 바다에서 힐링하세요. 총점: {score}",
  삼척파: "삼척파 유형: 깔끔한 육수와 맑은 색감을 선호하는 당신! 혼자서 조용히 바다를 만끽하세요. 총점: {score}",
  자리물회파: "자리물회파 유형: 짭조름한 바다 냄새와 쫄깃한 식감을 사랑하는 당신! 자연 속에서 자유를 느껴보세요. 총점: {score}",
  남해파: "남해파 유형: 부드럽고 향미로운 해산물을 즐기는 당신! 저녁 바다에서 낭만을 만끽하세요. 총점: {score}",
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const router = useRouter();

  const handleAnswer = (choice: number) => {
    const newAnswers = { ...answers, [currentPage]: choice };
    setAnswers(newAnswers);

    if (currentPage < 11) {
      setCurrentPage(currentPage + 1);
    } else {
      // Calculate results
      const scores: { [key: string]: number } = {
        속초파: 0, 포항파: 0, 강릉파: 0, 울진파: 0, 제주된장파: 0, 삼척파: 0, 자리물회파: 0, 남해파: 0,
      };
      let totalScore = 0;

      for (let i = 0; i < 12; i++) {
        const question = questions[i];
        const answer = newAnswers[i] || 0; // 0 for A, 1 for B
        const score = question.score;
        const resultKey = answer === 0 ? question.resultA : question.resultB;
        scores[resultKey] = (scores[resultKey] || 0) + score;
        totalScore += score;
      }

      const dominantResult = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
      const finalResult = results[dominantResult].replace("{score}", totalScore.toFixed(2));
      setCurrentPage(13); // Move to result page
    }
  };

  const restart = () => {
    setCurrentPage(0);
    setAnswers({});
    router.push("/start");
  };

  if (currentPage === 13) {
    return (
      <div className="w-full h-[100svh] bg-gradient-to-b from-[#1E3A8A] to-[#3B82F6] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">결과</h1>
        <p className="text-center max-w-md mb-8">{finalResult}</p>
        <GradientButton variant="primary" size="lg" onClick={restart}>
          다시 시작
        </GradientButton>
      </div>
    );
  }

  const currentQuestion = questions[currentPage];
  return (
    <div className="w-full h-[100svh] bg-gradient-to-b from-[#1E3A8A] to-[#3B82F6] flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-6">물회의 취향 검사</h1>
      <p className="text-center mb-8">{currentQuestion.text}</p>
      <div className="space-y-4">
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
}