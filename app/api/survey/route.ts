// app/api/survey/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { surveyVersionId, answers } = data;

    console.log("=== 설문 데이터 수신 ===");
    console.log("Survey Version ID:", surveyVersionId);
    console.log("Answers:", JSON.stringify(answers, null, 2));

    // TODO: 실제 DB 저장 로직 구현
    // 예: MongoDB, PostgreSQL 등에 저장

    return NextResponse.json({ 
      success: true, 
      message: "설문 데이터가 성공적으로 저장되었습니다!" 
    });
  } catch (error) {
    console.error("설문 저장 에러:", error);
    return NextResponse.json(
      { success: false, message: "설문 저장에 실패했습니다." },
      { status: 500 }
    );
  }
}