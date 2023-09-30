"use client";

import Image from "next/image";
import style from "./landing-quiz.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Quiz, QuizQuestion } from "./components/quiz/quiz";
import { QuizMockDataInterface } from "../../api/quiz/mock-data/quiz.mock-data";

interface LandingQuizProps {
  showQuiz: boolean;
  setShowQuiz: Dispatch<SetStateAction<boolean>>;
}

export default function LandingQuiz({
  showQuiz,
  setShowQuiz,
}: LandingQuizProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>();

  useEffect(() => {
    fetch("/api/quiz")
      .then((res) => res.json())
      .then((data: QuizMockDataInterface) => {
        console.log(data);
        setQuestions(data.questions);
      })
      .catch(console.error);
  }, [setQuestions]);

  return (
    <div className={`${style.container} ${showQuiz && style["quiz-started"]}`}>
      {showQuiz && questions ? (
        <Quiz questions={questions} setShowQuiz={setShowQuiz} />
      ) : (
        <>
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
        </>
      )}

      {/* <Image
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
      </div> */}
    </div>
  );
}
