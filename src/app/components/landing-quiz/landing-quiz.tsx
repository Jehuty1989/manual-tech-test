"use client";

import Image from "next/image";
import style from "./landing-quiz.module.scss";
import { useEffect, useState } from "react";
import Quiz, { QuizProps } from "./components/quiz/quiz";
import { QuizMockDataInterface } from "../../api/quiz/mock-data/quiz.mock-data";

export default function LandingQuiz() {
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuizMockDataInterface>();
  const [question, setQuestion] = useState<QuizProps>();

  useEffect(() => {
    fetch("/api/quiz")
      .then((res) => res.json())
      .then(setQuestions)
      .catch(console.error);
  }, [setQuestions]);

  useEffect(() => {
    if (questions) {
      setQuestion(questions.questions[0]);
      console.log(questions);
    }
  }, [questions]);

  return (
    <>
      {showQuiz && <Quiz></Quiz>}
      <div className={style.container}>
        <Image
          className={style.icon}
          src={"/icons/manual-icon.svg"}
          width={40}
          height={40}
          alt="Manual Icon"
        />
        <div className={style["text-container"]}>
          <h1 className={style.heading}>
            Be good
            <br />
            to yourself
          </h1>
          <p className={`${style.text} body-3`}>
            We’re working around the clock to bring you a holistic approach to
            your wellness. From top to bottom, inside and out.
          </p>
          <button
            onClick={() => setShowQuiz(true)}
            className={`${style.button} heading-7`}
          >
            TAKE THE QUIZ
          </button>
        </div>
      </div>
    </>
  );
}
