"use client";

import Image from "next/image";
import style from "./landing-quiz.module.scss";
import Link from "next/link";
import { useContext } from "react";
import { QuizContext } from "../../contexts/quiz.context";

export default function LandingQuiz() {
  const { selectedAnswers } = useContext(QuizContext);
  const howManySelectedAnswers = selectedAnswers.length;

  return (
    <div className={style.container}>
      <Image
        className={style.icon}
        src={"/icons/manual-icon.svg"}
        width={40}
        height={40}
        alt="Manual Icon"
      />
      <div className={style["text-container"]}>
        <h1 data-testid="landing-quiz-heading" className={style.heading}>
          Be good <br />
          to yourself
        </h1>
        <p className={`${style.text} body-3`}>
          We’re working around the clock to bring you a holistic approach to
          your wellness. From top to bottom, inside and out.
        </p>
        <Link
          data-testid="start-quiz-button"
          className={`${style.button} heading-7`}
          href={`/quiz/${howManySelectedAnswers + 1}`}
        >
          TAKE THE QUIZ
        </Link>
      </div>
    </div>
  );
}
