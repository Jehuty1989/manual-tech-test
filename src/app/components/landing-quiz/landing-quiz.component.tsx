import Image from "next/image";
import style from "./landing-quiz.module.scss";
import { Dispatch, SetStateAction } from "react";

interface LandingQuizProps {
  showQuiz: boolean;
  setShowQuiz: Dispatch<SetStateAction<boolean>>;
}

export default function LandingQuiz({
  showQuiz,
  setShowQuiz,
}: LandingQuizProps) {
  return (
    <div className={`${style.container} ${showQuiz && style["quiz-started"]}`}>
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
  );
}
