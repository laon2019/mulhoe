"use client";

import { Sparkles, ChevronRight, Waves } from "lucide-react";
import { questions } from "@/utils/constants";
import { GradientButton } from "./Button";

export const ProcessComponent = ({
  currentPage,
  answers,
  handleAnswer,
}: {
  currentPage: number;
  answers: { [key: number]: number };
  handleAnswer: (choice: number) => void;
}) => {
  const currentQuestion = questions[currentPage];

  // Fallback styles if questions array doesn't have bgGradient, accentColor, or decorColor
  const bgGradient = currentQuestion.bgGradient || "from-blue-100 to-cyan-50";
  const accentColor = currentQuestion.accentColor || "bg-blue-500";
  const decorColor = currentQuestion.decorColor || "text-blue-400";

  return (
    <div
      className={`w-full min-h-[100svh] bg-gradient-to-br ${bgGradient} flex items-center justify-center p-4 relative overflow-hidden`}
    >
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10">
        <Sparkles className={`w-12 h-12 ${decorColor}`} />
      </div>
      <div className="absolute top-10 right-10">
        <Sparkles className={`w-12 h-12 ${decorColor}`} />
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Waves className={`w-16 h-16 ${decorColor} opacity-30`} />
      </div>

      <div className="w-full max-w-2xl">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Top Badge */}
          <div
            className={`${accentColor} text-white px-6 py-2 rounded-full inline-block mb-6 font-bold text-sm tracking-wider shadow-lg`}
          >
            물회 취향 찾기
          </div>

          {/* Question Text */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight">
              {currentQuestion.text}
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"></div>
          </div>

          {/* Option Buttons */}
          <div className="space-y-4">
            <div>
              <GradientButton
                variant="primary"
                size="md"
                onClick={() => handleAnswer(0)}
                className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-lg hover:shadow-2xl transition-all duration-200 flex items-center justify-between group"
              >
                <span>{currentQuestion.optionA}</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-150" />
              </GradientButton>
            </div>
            <div>
              <GradientButton
                variant="primary"
                size="md"
                onClick={() => handleAnswer(1)}
                className="w-full bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-lg hover:shadow-2xl transition-all duration-200 flex items-center justify-between group"
              >
                <span>{currentQuestion.optionB}</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-150" />
              </GradientButton>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">
                질문 {currentPage + 1} / {questions.length}
              </span>
              <span className="text-sm text-gray-600 font-medium">
                {Math.round(((currentPage + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                style={{ width: `${((currentPage + 1) / questions.length) * 100}%` }}
                className={`h-full ${accentColor} rounded-full`}
              />
            </div>
          </div>

          {/* Footer Quote */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 italic text-sm">
              "양념이 진해야 인생이 진하지."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};