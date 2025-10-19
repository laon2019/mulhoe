import connectDB from "@/lib/mongoose";


import { NextRequest, NextResponse } from "next/server";
import Surveys from "../../../model/surveys";
import SurveyVersion from "../../../model/surveyVersion";
import { Question, Restaurant, SurveyAnswer } from "../../../types/survey";

const HARDCODED_SURVEY_VERSION_ID = "68f49c86be6379fad16c38bc";

// ✅ 레스토랑 데이터 (프론트와 동일)
const restaurants: Restaurant[] = [
  { name: "감자바우", address: "강원 속초시 청초호반로 242", phone: "033-632-0734" },
  { name: "갱수네맛집", address: "강원 속초시 미시령로 3376-4", phone: "033-637-0048" },
  { name: "구구집", address: "강원 속초시 중앙로 341", phone: "033-636-1888" },
  { name: "나루터물회", address: "강원 속초시 중앙부두길 75", phone: "010-2846-8611" },
  { name: "대포전복양푼물회", address: "강원 속초시 대포항길 60", phone: "033-635-1813" },
  { name: "돌고래회센터", address: "강원 속초시 대포항희망길 49", phone: "033-637-5256" },
  { name: "동명항오징어난전", address: "강원 속초시 중앙로 214-1", phone: "010-5373-7491" },
  { name: "동산항물회 속초점", address: "강원 속초시 엑스포로 135-6", phone: "0507-1420-9855" },
  { name: "무진장물회", address: "강원 속초시 대포항길 17", phone: "0507-1422-3988" },
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
  { name: "진양횟집", address: "강원 속초시 청초호반로 318", phone: "033-635-9999" },
  { name: "청초수물회 속초본점", address: "강원 속초시 엑스포로 12-36", phone: "033-635-5050" },
  { name: "청초항회국수", address: "강원 속초시 엑스포로2길 29", phone: "0507-1350-3360" },
  { name: "화진호 이선장네", address: "강원 속초시 먹거리4길 18-1", phone: "0507-1417-0750" },
];

// ✅ 질문 데이터 (프론트와 100% 동일)
const questions: Question[] = [
  { 
    id: 1, text: "1. 육수 스타일은?(택1)", type: "single", questionId: "style",
    options: [
      { label: "진한 스타일", matches: [0, 1, 3, 5, 6, 8, 9, 10, 12, 19, 21, 23] },
      { label: "개성 강조형", matches: [2, 4, 7, 11, 13, 18, 20, 22] },
      { label: "담백 깔끔 지향형", matches: [14, 15, 16, 17, 24] },
    ],
  },
  { 
    id: 2, text: "2. 육수 얼음은?(택1)", type: "single", questionId: "ice",
    options: [
      { label: "수저로 저으면 금새 녹는 얼음육수", matches: [2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 21, 22, 23, 24] },
      { label: "얼음 동동 시원한 육수", matches: [1, 5, 6, 16] },
      { label: "없어요", matches: [0, 17, 19] },
    ],
  },
  { 
    id: 3, text: "3. 물회의 꽃, 해산물 고명은?(다중선택)", type: "multi", isImage: true, questionId: "seafood",
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
    id: 4, text: "4. 고명에는 이것만큼은 꼭!(다중선택)", type: "multi", isImage: true, questionId: "garnish",
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
    id: 5, text: "5. 빛나지 않아도 빛이 나는 밑반찬(택1)", type: "single", questionId: "sides",
    options: [
      { label: "없어도 괜찮아요!", matches: [7] },
      { label: "적지만 확실한 밑반찬!", matches: [0, 5, 8, 9, 13, 15, 18, 23] },
      { label: "많은 종류의 밑반찬이 좋아요!", matches: [1, 2, 3, 4, 10, 11, 12, 14, 16, 17, 19, 20, 21, 22, 24] },
    ],
  },
  { 
    id: 6, text: "6. 담겨나올 그릇은?", type: "single", isImage: true, questionId: "bowl",
    options: [
      { label: "정갈한 사기그릇", matches: [0, 3, 5, 8, 9, 11, 13], imageSrc: "/물회취향_이미지소스/6. 담겨나올 그릇/사기그릇.webp" },
      { label: "고즈넉한 놋그릇", matches: [22], imageSrc: "/물회취향_이미지소스/6. 담겨나올 그릇/놋그릇.webp" },
      { label: "실용적인 스텐그릇", matches: [1, 2, 4, 7, 15, 16, 17, 19, 23, 24], imageSrc: "/물회취향_이미지소스/6. 담겨나올 그릇/스텐그릇.webp" },
      { label: "편안한 플라스틱 그릇", matches: [6, 10, 12, 14, 20, 21], imageSrc: "/물회취향_이미지소스/6. 담겨나올 그릇/플라스틱그릇.webp" },
    ],
  },
  { 
    id: 7, text: "7. 밥VS국수(다중선택)", type: "multi", isImage: true, questionId: "carb",
    options: [
      { label: "밥이 먼저죠", matches: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], imageSrc: "/물회취향_이미지소스/7. 밥vs국수/밥이 먼저죠.webp" },
      { label: "국수가 먼저죠", matches: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], imageSrc: "/물회취향_이미지소스/7. 밥vs국수/국수가 먼저죠.webp" },
    ],
  },
  { 
    id: 8, text: "8. 육수의 염도(5단계)", type: "slider", questionId: "salt",
    min: 0, max: 5, step: 1, labels: ["슴슴한게 좋아요", "짠게 좋아요"],
  },
  { 
    id: 9, text: "9. 육수의 당도(5단계)", type: "slider", questionId: "sugar",
    min: 0, max: 5, step: 1, labels: ["달달해야죠", "시큼해야죠"],
  },
  { 
    id: 10, text: "10. 육수의 첨가물", type: "single", isImage: true, questionId: "additive",
    options: [
      { label: "식초를 곁들인 육수", matches: [], imageSrc: "/물회취향_이미지소스/10. 육수의 첨가물/식초를 곁들인 육수.webp" },
      { label: "참기름의 향 가득 육수", matches: [], imageSrc: "/물회취향_이미지소스/10. 육수의 첨가물/참기름의 향 가득 육수.webp" },
      { label: "기본적인 정통의 육수", matches: [], imageSrc: "/물회취향_이미지소스/10. 육수의 첨가물/기본적인 정통의 육수.webp" },
    ],
  },
];

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 === POST /api/survey 시작 ===");
    await connectDB();
    console.log("✅ MongoDB 연결 성공!");

    // ✅ surveyVersionId 필요 없음! 자동 하드코딩
    const { answers } = await request.json();

    console.log("📝 answers:", answers.length, "개 질문");
    console.log("🔗 surveyVersionId:", HARDCODED_SURVEY_VERSION_ID);

    // ✅ 모든 10개 질문 검증
    const requiredQuestionIds = questions.map(q => q.questionId);
    const receivedQuestionIds = answers.map((a: SurveyAnswer) => a.questionId);
    const missingQuestions = requiredQuestionIds.filter(id => !receivedQuestionIds.includes(id));
    
    if (missingQuestions.length > 0) {
      console.error("❌ 누락된 질문:", missingQuestions);
      return NextResponse.json(
        { success: false, message: `누락된 질문: ${missingQuestions.join(", ")}` },
        { status: 400 }
      );
    }

    // ✅ 추천 로직 (Q1-6만 사용)
    const scores: number[] = new Array(restaurants.length).fill(0);
    
    for (let qId = 1; qId <= 6; qId++) {
      const q = questions.find((question: Question) => question.id === qId);
      if (!q) continue;
      
      const answerData = answers.find((a: SurveyAnswer) => a.questionId === q.questionId);
      const ans = answerData?.response;
      
      if (!ans || ans.length === 0) continue;

      if (q.type === "single") {
        const optionIndex = q.options?.findIndex((opt: any) => opt.label === ans[0]);
        if (optionIndex !== undefined && optionIndex >= 0) {
          const matches = q.options![optionIndex].matches || [];
          matches.forEach((idx: number) => scores[idx]++);
        }
      } else if (q.type === "multi") {
        ans.forEach((label: string) => {
          const optionIndex = q.options?.findIndex((opt: any) => opt.label === label);
          if (optionIndex !== undefined && optionIndex >= 0) {
            const matches = q.options![optionIndex].matches || [];
            matches.forEach((idx: number) => scores[idx]++);
          }
        });
      }
    }

    // ✅ 상위 2개 선정
    let maxScore = Math.max(...scores);
    let topIndices: number[] = scores
      .map((s, i) => (s === maxScore ? i : -1))
      .filter((i) => i !== -1);
    
    if (topIndices.length > 2) {
      topIndices.sort(() => Math.random() - 0.5);
      topIndices = topIndices.slice(0, 2);
    } else if (topIndices.length < 2) {
      let secondMax = Math.max(...scores.filter((s) => s < maxScore));
      const secondIndices = scores
        .map((s, i) => (s === secondMax ? i : -1))
        .filter((i) => i !== -1);
      if (secondIndices.length > 0) {
        topIndices.push(secondIndices[0]);
      }
    }

    const topRestaurants = topIndices.map((i) => ({ 
      ...restaurants[i], 
      index: i + 1 
    }));

    // ✅ Surveys 모델에 저장 (하드코딩된 surveyVersionId!)
    const newSurvey = new Surveys({
      surveyVersionId: HARDCODED_SURVEY_VERSION_ID, // ✅ 자동 하드코딩!
      answers, // 모든 10개 질문
      topRestaurants
    });
    
    await newSurvey.save();
    console.log("💾 DB 저장 완료! ID:", newSurvey._id);
    console.log("📁 컬렉션: surveys (소문자)");

    console.log("🏆 추천 결과:");
    topRestaurants.forEach((r, idx) => {
      console.log(`${idx + 1}위: ${r.name}`);
    });

    return NextResponse.json({ 
      success: true, 
      message: "추천 완료!",
      topRestaurants,
      surveyId: newSurvey._id.toString()
    });

  } catch (error) {
    console.error("💥 POST 에러:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

// ✅ GET: 하드코딩된 surveyVersionId 반환
export async function GET(request: NextRequest) {
  try {
    console.log("🚀 === GET /api/survey 시작 ===");
    await connectDB();
    console.log("✅ MongoDB 연결 성공!");

    // ✅ 하드코딩된 ID 반환
    console.log("✅ v1 버전 ID 반환:", HARDCODED_SURVEY_VERSION_ID);

    return NextResponse.json({
      success: true,
      surveyVersionId: HARDCODED_SURVEY_VERSION_ID, // ✅ 하드코딩!
      version: 1,
      name: "물회의 취향"
    });

  } catch (error) {
    console.error("💥 GET 에러:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}