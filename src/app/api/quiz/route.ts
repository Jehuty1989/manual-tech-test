import { NextResponse } from "next/server";
import {
  QuizMockData,
  QuizMockDataInterface,
} from "./mock-data/quiz.mock-data";

export async function GET(): Promise<NextResponse<QuizMockDataInterface>> {
  return NextResponse.json(QuizMockData);
}
