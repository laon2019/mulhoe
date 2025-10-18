"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { StartComponent } from "@/components/Start";

// GradientButton Component
const GradientButton = ({ onClick, className, children }: { onClick: () => void; className?: string; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:from-blue-600 hover:to-indigo-700 transition-all ${className}`}
  >
    {children}
  </button>
);

// LoadingPage Component
const LoadingPage = () => (
  <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full"
    />
    <p className="mt-6 text-xl font-semibold text-slate-700">분석 중...</p>
  </div>
);

// Define restaurants with their info
const restaurants: Array<{
  name: string;
  address: string;
  phone: string;
}> = [
  { name: "감자바우", address: "강원 속초시 청초호반로 242", phone: "033-632-0734" },
  { name: "갱수네맛집", address: "강원 속초시 미시령로 3376-4", phone: "033-637-0048" },
  { name: "구구집", address: "강원 속초시 중앙로 341", phone: "033-636-1888" },
  { name: "나루터물회", address: "강원 속초시 중앙부두길 75", phone: "010-2846-8611" },
  { name: "대포전복양푼물회", address: "강원 속초시 대포항길 60", phone: "033-635-1813" },
  { name: "돌고래회센터", address: "강원 속초시 대포항희망길 49", phone: "033-637-5256" },
  { name: "동명항오징어난전", address: "강원 속초시 중앙로 214-1", phone: "010-5373-7491" },
  { name: "동산항물회 속초점", address: "강원 속초시 엑스포로 135-6", phone: "0507-1420-9855" },
  { name: "무진장 물회", address: "강원 속초시 대포항길 17", phone: "0507-1422-3988" },
  { name: "물담물회국수", address: "강원 속초시 해오름로 137", phone: "0507-1413-1567" },
  { name: "민지네물회", address: "강원 속초시 대포항길 62", phone: "033-638-7137" },
  { name: "봉포머구리집", address: "강원 속초시 영랑해안길 223", phone: "0507-1404-2026" },
  { name: "속초어장물회", address: "강원 속초시 엑스포로 31", phone: "033-637-8833" },
  { name: "속초항아리물회", address: "강원 속초시 해오름로188번길 11", phone: "033-635-4488" },
  { name: "속초해녀마을바람꽃해녀마을", address: "강원 속초시 바람꽃마을길 37 1층", phone: "0507-1416-5157" },
  { name: "속초해변물회맛집", address: "강원 속초시 새마을길 66", phone: "0507-1431-3588" },
  { name: "원조속초회국수", address: "강원 속초시 교동 961", phone: "033-635-2732" },
  { name: "송도물회", address: "강원 속초시 중앙부두길 63", phone: "0507-1392-6985" },
  { name: "아바이회국수", address: "강원 속초시 청호로 115-12", phone: "033-636-1299" },
  { name: "영금물회", address: "강원 속초시 영금정로2길 11", phone: "033-631-2358" },
  { name: "완도회식당 속초", address: "강원 속초시 먹거리4길 21", phone: "033-631-1418" },
  { name: "진양횟집 속초", address: "강원 속초시 청초호반로 318", phone: "033-635-9999" },
  { name: "청초수물회 속초본점", address: "강원 속초시 엑스포로 12-36", phone: "033-635-5050" },
  { name: "청초항회국수", address: "강원 속초시 엑스포로2길 29", phone: "0507-1350-3360" },
  { name: "화진호 이선장네", address: "강원 속초시 먹거리4길 18-1", phone: "0507-1417-0750" },
];

// Define questions with types
type Option = {
  label: string;
  matches: number[];
  imageSrc?: string;
};

type Question = {
  id: number;
  text: string;
  type: "single" | "multi" | "slider";
  isImage?: boolean;
  options?: Option[];
  min?: number;
  max?: number;
  step?: number;
  labels?: string[];
  questionId: string; // API용 questionId 추가
};

const questions: Question[] = [
  {
    id: 1,
    text: "1. 육수 스타일은?(택1)",
    type: "single",
    questionId: "style",
    options: [
      { label: "진한 스타일", matches: [0, 1, 3, 5, 6, 8, 9, 10, 12, 19, 21, 23] },
      { label: "개성 강조형", matches: [2, 4, 7, 11, 13, 18, 20, 22] },
      { label: "담백 깔끔 지향형", matches: [14, 15, 16, 17, 24] },
    ],
  },
  {
    id: 2,
    text: "2. 육수 얼음은?(택1)",
    type: "single",
    questionId: "ice",
    options: [
      { label: "수저로 저으면 금새 녹는 얼음육수", matches: [2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 21, 22, 23, 24] },
      { label: "얼음 동동 시원한 육수", matches: [1, 5, 6, 16] },
      { label: "없어요", matches: [0, 17, 19] },
    ],
  },
  {
    id: 3,
    text: "3. 물회의 꽃, 해산물 고명은?(다중선택)",
    type: "multi",
    isImage: true,
    questionId: "seafood",
    options: [
      { label: "생선회", matches: [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], imageSrc: "/물회취향_이미지소스/3. 물회의 꽃 해산물 고명은/생선회.webp" },
      { label: "해삼", matches: [4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 19, 23], imageSrc: "/물회취향_이미지소스/3. 물회의 꽃 해산물 고명은/해삼.webp" },
      { label: "오징어", matches: [0, 1, 4, 6, 10, 11, 13, 18, 19, 23], imageSrc: "/물회취향_이미지소스/3. 물회의 꽃 해산물 고명은/오징어.webp" },
      { label: "전복", matches: [1, 4, 7, 8, 9, 10, 11, 13, 14, 15, 19, 21, 22, 23], imageSrc: "/물회취향_이미지소스/3. 물회의 꽃 해산물 고명은/전복.webp" },
      { label: "골뱅이", matches: [22, 23], imageSrc: "/물회취향_이미지소스/3. 물회의 꽃 해산물 고명은/골뱅이.webp" },
      { label: "문어", matches: [1, 2, 5, 6, 10, 11, 12, 13, 14, 15, 19, 23, 24], imageSrc: "/물회취향_이미지소스/3. 물회의 꽃 해산물 고명은/문어.webp" },
      { label: "멍게", matches: [1, 2, 4, 5, 8, 9, 10, 12, 13, 14, 19, 21, 22, 23], imageSrc: "/물회취향_이미지소스/3. 물회의 꽃 해산물 고명은/멍게.webp" },
      { label: "소라", matches: [1, 2, 10, 11], imageSrc: "/물회취향_이미지소스/3. 물회의 꽃 해산물 고명은/소라.webp" },
      { label: "새우", matches: [11, 23], imageSrc: "/물회취향_이미지소스/3. 물회의 꽃 해산물 고명은/새우.webp" },
    ],
  },
  {
    id: 4,
    text: "4. 고명에는 이것만큼은 꼭!(다중선택)",
    type: "multi",
    isImage: true,
    questionId: "topping",
    options: [
      { label: "당근", matches: [1, 2, 3, 4, 5, 11, 12, 13, 15, 18, 19, 20, 21, 22, 23], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/당근.webp" },
      { label: "장뇌삼", matches: [4], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/장뇌삼.webp" },
      { label: "깻잎", matches: [0, 4, 8, 15, 23], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/깻잎.webp" },
      { label: "양배추", matches: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 18, 19, 21, 23, 24], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/양배추.webp" },
      { label: "해초류", matches: [1, 8, 13, 15, 20, 21], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/해초류.webp" },
      { label: "무순", matches: [2, 3, 5, 8, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/무순.webp" },
      { label: "방울토마토", matches: [7, 23], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/방울토마토.webp" },
      { label: "배", matches: [5], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/배.webp" },
      { label: "사과", matches: [3, 8], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/사과.webp" },
      { label: "무채", matches: [0, 2, 3, 6, 11, 12, 15, 19, 20], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/무채.webp" },
      { label: "양파", matches: [2, 3, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 23, 24], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/양파.webp" },
      { label: "깨", matches: [0, 2, 6, 7, 8, 9, 12, 13, 14, 17, 18, 19, 20, 22, 23], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/깨.webp" },
      { label: "상추", matches: [0, 1, 5, 8, 9, 10, 11, 13, 15, 18, 19, 20, 21, 22, 23], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/상추.webp" },
      { label: "피망", matches: [7], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/피망.webp" },
      { label: "김", matches: [2, 3, 9, 12, 17], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/김.webp" },
      { label: "호박", matches: [3, 4, 8, 23], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/호박.webp" },
      { label: "오이", matches: [1, 5, 6, 8, 12, 15, 20], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/오이.webp" },
      { label: "콩나물", matches: [16], imageSrc: "/물회취향_이미지소스/4. 고명에는 이것만큼은 꼭/콩나물.webp" },
    ],
  },
  {
    id: 5,
    text: "5. 빛나지 않아도 빛이 나는 밑반찬(택1)",
    type: "single",
    questionId: "side",
    options: [
      { label: "없어도 괜찮아요!", matches: [7] },
      { label: "적지만 확실한 밑반찬!", matches: [0, 5, 8, 9, 13, 15, 18, 23] },
      { label: "많은 종류의 밑반찬이 좋아요!", matches: [1, 2, 3, 4, 10, 11, 12, 14, 16, 17, 19, 20, 21, 22, 24] },
    ],
  },
  {
    id: 6,
    text: "6. 담겨나올 그릇은?",
    type: "single",
    isImage: true,
    questionId: "bowl",
    options: [
      { label: "정갈한 사기그릇", matches: [0, 3, 5, 8, 9, 11, 13], imageSrc: "/물회취향_이미지소스/6. 담겨나올 그릇/사기그릇.webp" },
      { label: "고즈넉한 놋그릇", matches: [22], imageSrc: "/물회취향_이미지소스/6. 담겨나올 그릇/놋그릇.webp" },
      { label: "실용적인 스텐그릇", matches: [1, 2, 4, 7, 15, 16, 17, 19, 23, 24], imageSrc: "/물회취향_이미지소스/6. 담겨나올 그릇/스텐그릇.webp" },
      { label: "편안한 플라스틱 그릇", matches: [6, 10, 12, 14, 20, 21], imageSrc: "/물회취향_이미지소스/6. 담겨나올 그릇/플라스틱그릇.webp" },
    ],
  },
  {
    id: 7,
    text: "7. 밥VS국수(다중선택)",
    type: "multi",
    isImage: true,
    questionId: "carb",
    options: [
      { label: "밥이 먼저죠", matches: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], imageSrc: "/물회취향_이미지소스/7. 밥vs국수/밥이 먼저죠.webp" },
      { label: "국수가 먼저죠", matches: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], imageSrc: "/물회취향_이미지소스/7. 밥vs국수/국수가 먼저죠.webp" },
    ],
  },
  {
    id: 8,
    text: "8. 육수의 염도(5단계)",
    type: "slider",
    questionId: "salt",
    min: 0,
    max: 5,
    step: 1,
    labels: ["슴슴한게 좋아요", "짠게 좋아요"],
  },
  {
    id: 9,
    text: "9. 육수의 당도(5단계)",
    type: "slider",
    questionId: "sweet",
    min: 0,
    max: 5,
    step: 1,
    labels: ["달달해야죠", "시큼해야죠"],
  },
  {
    id: 10,
    text: "10. 육수의 첨가물",
    type: "single",
    isImage: true,
    questionId: "additive",
    options: [
      { label: "식초를 곁들인 육수", matches: [], imageSrc: "/물회취향_이미지소스/10. 육수의 첨가물/식초를 곁들인 육수.webp" },
      { label: "참기름의 향 가득 육수", matches: [], imageSrc: "/물회취향_이미지소스/10. 육수의 첨가물/참기름의 향 가득 육수.webp" },
      { label: "기본적인 정통의 육수", matches: [], imageSrc: "/물회취향_이미지소스/10. 육수의 첨가물/기본적인 정통의 육수.webp" },
    ],
  },
];

// ProcessComponent
const ProcessComponent: React.FC<{ onSubmit: (answers: Record<number, number | number[]>) => void }> = ({ onSubmit }) => {
  const [answers, setAnswers] = useState<Record<number, number | number[]>>({});
  const questionRefs = useRef<HTMLDivElement[]>([]);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<{ name: string; address: string; phone: string; index: number } | null>(null);

  const handleSingleChange = (qId: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const handleMultiChange = (qId: number, optionIndex: number, checked: boolean) => {
    setAnswers((prev) => {
      const current = (prev[qId] as number[]) || [];
      return {
        ...prev,
        [qId]: checked ? [...current, optionIndex] : current.filter((i) => i !== optionIndex),
      };
    });
  };

  const handleSliderChange = (qId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  // API 요청 함수
  const sendSurveyData = async (rawAnswers: Record<number, number | number[]>) => {
    try {
      // 1. Raw Answers를 API 형식으로 변환
      const apiAnswers = questions.map((q) => {
        const answer = rawAnswers[q.id];
        let response: string[] = [];
        
        if (q.type === "single" && typeof answer === "number" && q.options) {
          response = [q.options[answer].label];
        } else if (q.type === "multi" && Array.isArray(answer) && q.options) {
          response = answer.map((idx) => q.options![idx].label);
        } else if (q.type === "slider" && typeof answer === "number") {
          response = [answer.toString()];
        }
        // 미선택 시 빈 배열 []
        
        return {
          questionId: q.questionId,
          response,
        };
      });

      // 2. API 요청 데이터 구성
      const requestData = {
        surveyVersionId: "651b75c8e312891d4e4c9f1a", // ★ 실제로는 GET으로 받아온 값 사용
        answers: apiAnswers,
      };

      console.log("=== API 전송 데이터 ===");
      console.log(JSON.stringify(requestData, null, 2));

      // 3. POST 요청
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("설문이 성공적으로 저장되었습니다!");
        onSubmit(rawAnswers); // 맛집 추천 로직 실행
      } else {
        toast.error("설문 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("API 요청 에러:", error);
      toast.error("서버와의 연결에 문제가 있습니다.");
      onSubmit(rawAnswers); // 에러여도 맛집 추천은 진행
    }
  };

  const submit = async () => {
    let missing: number | null = null;
    for (const q of questions) {
      const ans = answers[q.id];
      if (q.type === "single" && typeof ans !== "number") {
        missing = q.id;
        break;
      } else if (q.type === "multi" && (!Array.isArray(ans) || ans.length === 0)) {
        missing = q.id;
        break;
      } else if (q.type === "slider" && typeof ans !== "number") {
        missing = q.id;
        break;
      }
    }

    if (missing !== null) {
      questionRefs.current[missing - 1]?.scrollIntoView({ behavior: "smooth" });
      toast.error(`질문 ${missing}을 선택해주세요!`);
      return;
    }

    // API로 데이터 전송 후 맛집 추천
    await sendSurveyData(answers);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center p-6 overflow-y-auto relative">
      <Toaster />
      <button 
        onClick={() => setIsDictionaryOpen(true)} 
        className="fixed top-4 right-4 bg-white px-4 py-2 rounded shadow z-40"
      >
        물회 도감
      </button>
      {isDictionaryOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">물회 도감</h2>
            {selectedRestaurant ? (
              <div className="mb-6">
                <img 
                  src={`/속초물회사진/${selectedRestaurant.index}. ${selectedRestaurant.name}.png`} 
                  alt={selectedRestaurant.name} 
                  className="w-full h-48 object-cover rounded-lg mb-2" 
                />
                <h3 className="text-xl font-semibold">{selectedRestaurant.name}</h3>
                <p>주소: {selectedRestaurant.address}</p>
                <p>전화: {selectedRestaurant.phone}</p>
              </div>
            ) : (
              <p className="mb-6">식당을 선택하세요.</p>
            )}
            <div className="grid grid-cols-2 gap-2">
              {restaurants.map((rest, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedRestaurant({ ...rest, index: idx + 1 })} 
                  className="p-2 bg-blue-100 rounded hover:bg-blue-200"
                >
                  {rest.name}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setIsDictionaryOpen(false)} 
              className="mt-4 w-full py-2 bg-red-500 text-white rounded"
            >
              닫기
            </button>
          </div>
        </div>
      )}
      <div className="w-full max-w-4xl space-y-8">
        {questions.map((q, index) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-slate-200 hover:shadow-2xl transition-all duration-300"
            ref={(el) => { questionRefs.current[index] = el!; }}
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-800 tracking-tight">{q.text}</h2>
            {q.type === "single" && q.options && (
              <div className={`grid ${q.isImage ? (q.id === 6 || q.id === 10 ? 'grid-cols-2 gap-4' : 'grid-cols-2 sm:grid-cols-3 gap-4') : 'space-y-3'}`}>
                {q.options.map((opt, idx) => (
                  <label key={idx} className={`cursor-pointer group ${q.id === 10 && idx === 2 ? 'col-span-2 justify-self-center' : ''}`}>
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      checked={answers[q.id] === idx}
                      onChange={() => handleSingleChange(q.id, idx)}
                      className="hidden"
                    />
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-2xl transition-all duration-300 ${answers[q.id] === idx ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-blue-400 shadow-lg text-white' : 'bg-slate-50 border-2 border-slate-200 hover:border-blue-300 hover:shadow-md'}`}
                    >
                      {opt.imageSrc && (
                        <div className="w-full h-32 flex items-center justify-center mb-3">
                          <img
                            src={opt.imageSrc}
                            alt={opt.label}
                            className="object-contain w-32 h-32"
                          />
                        </div>
                      )}
                      <span className={`block text-center font-semibold ${answers[q.id] === idx ? 'text-white' : 'text-slate-700 group-hover:text-blue-600'}`}>{opt.label}</span>
                    </motion.div>
                  </label>
                ))}
              </div>
            )}
            {q.type === "multi" && q.options && (
              <div className={`grid ${q.isImage ? (q.id === 7 ? 'grid-cols-2 gap-3' : 'grid-cols-2 sm:grid-cols-3 gap-3') : 'space-y-3'}`}>
                {q.options.map((opt, idx) => (
                  <label key={idx} className="cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={(answers[q.id] as number[])?.includes(idx) || false}
                      onChange={(e) => handleMultiChange(q.id, idx, e.target.checked)}
                      className="hidden"
                    />
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-2xl transition-all duration-300 ${(answers[q.id] as number[])?.includes(idx) ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-blue-400 shadow-lg text-white' : 'bg-slate-50 border-2 border-slate-200 hover:border-blue-300 hover:shadow-md'}`}
                    >
                      {opt.imageSrc && (
                        <div className="w-full h-32 flex items-center justify-center mb-2">
                          <img
                            src={opt.imageSrc}
                            alt={opt.label}
                            className="object-contain w-32 h-32"
                          />
                        </div>
                      )}
                      <span className={`block text-center text-sm font-semibold ${(answers[q.id] as number[])?.includes(idx) ? 'text-white' : 'text-slate-700 group-hover:text-blue-600'}`}>{opt.label}</span>
                    </motion.div>
                  </label>
                ))}
              </div>
            )}
            {q.type === "slider" && q.min !== undefined && q.max !== undefined && q.step !== undefined && (
              <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl">
                <input
                  type="range"
                  min={q.min}
                  max={q.max}
                  step={q.step}
                  value={(answers[q.id] as number) ?? q.min}
                  onChange={(e) => handleSliderChange(q.id, parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between mt-2 text-sm text-slate-600">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <span key={num}>{num}</span>
                  ))}
                </div>
                {q.labels && (
                  <div className="flex justify-between mt-4 text-sm font-medium text-slate-600">
                    <span>{q.labels[0]}</span>
                    <span>{q.labels[1]}</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ))}
        <GradientButton onClick={submit} className="w-full py-4 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          결과 보기
        </GradientButton>
      </div>
    </div>
  );
};

// Main Component
export default function Home() {
  const [currentState, setCurrentState] = useState<"start" | "process" | "loading" | "result">("start");
  const [topRestaurants, setTopRestaurants] = useState<Array<{ name: string; address: string; phone: string; index: number }>>([]);

  const handleSubmit = (answers: Record<number, number | number[]>) => {
    const scores: number[] = new Array(restaurants.length).fill(0);
    for (let qId = 1; qId <= 6; qId++) {
      const q = questions.find((q) => q.id === qId);
      if (!q) continue;
      const ans = answers[qId];
      if (q.type === "single" && typeof ans === "number" && q.options?.[ans]) {
        const matches = q.options[ans].matches;
        matches.forEach((idx) => scores[idx]++);
      } else if (q.type === "multi" && Array.isArray(ans) && q.options) {
        ans.forEach((optIdx: number) => {
          const matches = q.options?.[optIdx]?.matches;
          matches?.forEach((idx) => scores[idx]++);
        });
      }
    }

    let maxScore = Math.max(...scores);
    let topIndices: number[] = scores.map((s, i) => (s === maxScore ? i : -1)).filter((i) => i !== -1);
    if (topIndices.length > 2) {
      topIndices.sort(() => Math.random() - 0.5);
      topIndices = topIndices.slice(0, 2);
    } else if (topIndices.length < 2) {
      let secondMax = scores.filter((s) => s < maxScore).reduce((a, b) => Math.max(a, b), -1);
      if (secondMax > -1) {
        const secondIndices = scores.map((s, i) => (s === secondMax ? i : -1)).filter((i) => i !== -1);
        secondIndices.sort(() => Math.random() - 0.5);
        topIndices.push(secondIndices[0]);
      }
    }

    setTopRestaurants(topIndices.map((i) => ({ ...restaurants[i], index: i + 1 })));
    setCurrentState("loading");
  };

  useEffect(() => {
    if (currentState === "loading") {
      const timer = setTimeout(() => {
        setCurrentState("result");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentState]);

  const restart = () => {
    setCurrentState("start");
    setTopRestaurants([]);
  };

  return (
    <div className="w-full min-h-screen">
      {(() => {
        switch (currentState) {
          case "start":
            return <StartComponent onStart={() => setCurrentState("process")} />;
          case "process":
            return <ProcessComponent onSubmit={handleSubmit} />;
          case "loading":
            return <LoadingPage />;
          case "result":
            return (
              <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center p-6">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold mb-8 text-slate-800 tracking-tight"
                >
                  당신을 위한 물회 맛집
                </motion.h1>
                <div className="w-full max-w-3xl space-y-6">
                  {topRestaurants.map((rest, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-slate-200 hover:shadow-3xl transition-all duration-300"
                    >
                      <div className="relative h-64 w-full bg-gradient-to-br from-blue-100 to-indigo-100">
                        <img
                          src={`/속초물회사진/${rest.index}. ${rest.name}.png`}
                          alt={rest.name}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                          {idx + 1}위
                        </div>
                      </div>
                      <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4 text-slate-800">{rest.name}</h2>
                        <div className="space-y-2 text-slate-600">
                          <p className="flex items-center gap-2">
                            <span className="font-semibold text-blue-600">📍</span>
                            {rest.address}
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-semibold text-blue-600">📞</span>
                            {rest.phone}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <GradientButton onClick={restart} className="w-full py-4 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-shadow mt-8">
                    다시 하기
                  </GradientButton>
                </div>
              </div>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}