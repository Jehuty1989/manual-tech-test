"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import Loading from "../../components/loading/loading.component";
import { QuizOption, QuizQuestion } from "../quiz/[id]/page";

interface QuizContextInterface {
  questions: QuizQuestion[];
  selectedAnswers: QuizOption[];
  setSelectedAnswers: Dispatch<SetStateAction<QuizOption[]>>;
}

export interface QuizDataInterface {
  questions: QuizQuestion[];
}

export const QuizContext = createContext<QuizContextInterface>({
  questions: [],
  selectedAnswers: [],
  setSelectedAnswers: () => null,
});

export const SELECTED_ANSWERS_KEY = "selectedAnswers";

export default function Quiz({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<QuizOption[]>([]);

  useEffect(() => {
    fetch("/api/quiz")
      .then((res) => res.json())
      .then((data: QuizDataInterface) => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch((err) => {
        console.error("XYZ", err);
        setLoading(false);
      });
  }, [setQuestions, setLoading]);

  useEffect(() => {
    const existingAnswers: QuizOption[] = JSON.parse(
      localStorage.getItem(SELECTED_ANSWERS_KEY) || "[]",
    );

    setSelectedAnswers(existingAnswers);
  }, [setSelectedAnswers]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {questions && (
        <QuizContext.Provider
          value={{ questions, selectedAnswers, setSelectedAnswers }}
        >
          {children}
        </QuizContext.Provider>
      )}
    </>
  );
}
