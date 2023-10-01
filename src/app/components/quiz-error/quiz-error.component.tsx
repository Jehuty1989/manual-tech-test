import { Dispatch, SetStateAction, useCallback } from "react";
import CloseIcon from "../../../components/close-icon/close-icon.component";
import style from "./quiz-error.module.scss";

interface QuizErrorProps {
  setShowQuiz: Dispatch<SetStateAction<boolean>>;
}

export default function QuizError({ setShowQuiz }: QuizErrorProps) {
  const closeQuiz = useCallback((): void => {
    setShowQuiz(false);
  }, [setShowQuiz]);

  return (
    <div className={style.container}>
      <CloseIcon onClick={closeQuiz} />
      <div className={style["text-container"]}>
        <h1 data-testid="quiz-error-heading" className="heading-3">
          Quiz failed to load
        </h1>
        <p className="body-4">
          Please reload the page to try again or contact Manual support
        </p>
      </div>
    </div>
  );
}
