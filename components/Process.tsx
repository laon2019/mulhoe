import { questions } from "@/utils/constants";
import { GradientButton } from "./Button";

export const ProcessComponent = ({ currentPage, answers, handleAnswer }: { currentPage: number; answers: { [key: number]: number }; handleAnswer: (choice: number) => void }) => {
 
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
      <p className="mt-4 text-sm">페이지 {currentPage + 1} / 9</p>
    </div>
  );
};