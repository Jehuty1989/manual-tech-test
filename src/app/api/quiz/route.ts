import { NextResponse } from "next/server";
import { QuizMockData } from "./mock-data/quiz.mock-data";

export async function GET() {
  return NextResponse.json(QuizMockData);
}
