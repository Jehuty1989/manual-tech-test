"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { QuizQuestion } from "../components/quiz/quiz.component";
import { QuizDataInterface } from "../api/quiz/route";
import Loading from "../../components/loading/loading.component";

export const QuizContext = createContext<QuizDataInterface | null>(null);

export default function Quiz({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuizQuestion[]>();

  useEffect(() => {
    fetch("/api/quiz")
      .then((res) => res.json())
      .then((data: QuizDataInterface) => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [setQuestions, setLoading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {questions && (
        <QuizContext.Provider value={{ questions }}>
          {children}
        </QuizContext.Provider>
      )}
    </>
  );
}
