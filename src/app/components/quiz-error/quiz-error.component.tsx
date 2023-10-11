import { useCallback } from "react";
import CloseIcon from "../../../components/close-icon/close-icon.component";
import style from "./quiz-error.module.scss";
import { useRouter } from "next/navigation";

export default function QuizError() {
  const router = useRouter();

  const closeQuiz = useCallback((): void => {
    router.push("/");
  }, [router]);

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
