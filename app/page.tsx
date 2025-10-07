"use client";

import { useState } from "react";
import { GradientButton } from "@/components/Button";
import Image from "next/image";
import { motion } from "framer-motion";
import { questions } from "@/utils/constants";
import { StartComponent } from "@/components/Start";
import { ProcessComponent } from "@/components/Process";
import { ResultComponent } from "@/components/Result";

// Main Component
export default function Home() {
  const [currentState, setCurrentState] = useState<"start" | "process" | "result">("start");
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [resultText, setResultText] = useState<string>("");

  // Define result keys as a type
  type ResultKey = "속초파" | "포항파" | "강릉파" | "제주된장파" | "자리물회파" | "남해파";
  const results: Record<ResultKey, string> = {
    속초파: "속초파 유형: 당신은 시원한 얼음 육수와 맑은 맛을 사랑하는 스타일! 해양 심포니와 함께 잔잔한 바다를 즐기세요.",
    포항파: "포항파 유형: 새콤달콤한 비빔 스타일에 끌리는 당신! 활기찬 바닷가에서 친구들과 즐거운 시간을 보내세요.",
    강릉파: "강릉파 유형: 균형 잡힌 맛과 여유로운 분위기를 선호하는 당신! 조용한 해변에서 휴식을 취해보세요.",
    제주된장파: "제주된장파 유형: 구수한 된장과 든든함을 즐기는 당신! 아침 바다에서 힐링하세요.",
    자리물회파: "자리물회파 유형: 짭조름한 바다 냄새와 쫄깃한 식감을 사랑하는 당신! 자연 속에서 자유를 느껴보세요.",
    남해파: "남해파 유형: 부드럽고 향미로운 해산물을 즐기는 당신! 저녁 바다에서 낭만을 만끽하세요.",
  };

  const handleAnswer = (choice: number) => {
    const newAnswers = { ...answers, [currentPage]: choice };
    setAnswers(newAnswers);

    if (currentPage < 8) {
      setCurrentPage(currentPage + 1);
    } else {
      // Calculate results
      const scores: Record<ResultKey, number> = {
        속초파: 0, 포항파: 0, 강릉파: 0, 제주된장파: 0, 자리물회파: 0, 남해파: 0,
      };
      let totalScore = 0;

      for (let i = 0; i < questions.length; i++) {
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
