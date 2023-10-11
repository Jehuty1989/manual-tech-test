import { QuizQuestion } from "../../components/quiz/quiz.component";

export interface QuizMockDataInterface {
  questions: QuizQuestion[];
}

export async function GET(): Promise<Response> {
  const res = await fetch(
    "https://manual-case-study.herokuapp.com/questionnaires/6-part.json",
    // "https://manual-case-study.herokuapp.com/questionnaires/972423.json",
  );

  return res;
}
