"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { QuizContext } from "../../contexts/quiz.context";
import style from "./page.module.scss";
import { useRouter } from "next/navigation";
import CloseIcon from "../../../components/close-icon/close-icon.component";
import QuizError from "../../components/quiz-error/quiz-error.component";

type SelectedAnswerInterface = Record<number, QuizOption>;

export interface QuizOption {
  display: string;
  value: string | boolean;
  isRejection: boolean;
}

export interface QuizQuestion {
  question: string;
  type: "ChoiceType";
  options: QuizOption[];
}

const SELECTED_ANSWERS_KEY = "selectedAnswers";

export default function Quiz({ params }: { params: { id: string } }) {
  const indexOfQuestion = parseInt(params.id) - 1;
  const quiz = useContext(QuizContext);
  const howManyQuestions = quiz?.questions.length;
  const question = quiz?.questions[indexOfQuestion];
  const router = useRouter();
  const [isEndOfQuiz, setIsEndOfQuiz] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] =
    useState<SelectedAnswerInterface>({});

  useEffect(() => {
    if (howManyQuestions && howManyQuestions > 0) {
      setIsEndOfQuiz(indexOfQuestion >= howManyQuestions);
    } else {
      setIsEndOfQuiz(false);
    }
  }, [setIsEndOfQuiz, indexOfQuestion, howManyQuestions]);

  useEffect(() => {
    const existingAnswers = localStorage.getItem(SELECTED_ANSWERS_KEY);

    if (existingAnswers) {
      setSelectedAnswers(JSON.parse(existingAnswers));
    }
  }, [setSelectedAnswers]);

  const setAnswer = useCallback(
    (selectedAnswer: QuizOption): void => {
      const tempSelectedAnswers = selectedAnswers;
      tempSelectedAnswers[indexOfQuestion] = selectedAnswer;
      setSelectedAnswers({ ...tempSelectedAnswers });
      localStorage.setItem(
        SELECTED_ANSWERS_KEY,
        JSON.stringify(selectedAnswers),
      );
    },
    [indexOfQuestion, selectedAnswers, setSelectedAnswers],
  );

  const route = useCallback(
    (href: string): void => {
      // CAN PLACE ANALYTICS HERE TO SEE HOW FAR A USER GOT IN THE QUIZ
      router.push(href);
    },
    [router],
  );

  const resetQuiz = useCallback((): void => {
    const existingAnswers = localStorage.getItem(SELECTED_ANSWERS_KEY);
    console.log(existingAnswers);

    if (existingAnswers) {
      localStorage.removeItem(SELECTED_ANSWERS_KEY);
      route("/quiz/1");
    }
  }, [route]);

  if (!quiz) {
    return <QuizError />;
  }

  return (
    <>
      <div className={style.container}>
        <CloseIcon onClick={() => route("/")} />
        {isEndOfQuiz && (
          <p className={`${style.text} body-3`}>
            Great news! We have the perfect treatment for your hair loss.
            Proceed to{" "}
            <a
              className={style["manual-link"]}
              href="https://www.manual.co"
              target="_blank"
            >
              www.manual.co
            </a>
            , and prepare to say hello to your new hair!
          </p>
        )}
        <h1 data-testid="quiz-question" className={`${style.text} heading-4`}>
          {question?.question}
        </h1>
        <div className={style["answers-container"]}>
          {question?.options.map((option, index) => {
            const answerIsSelected =
              JSON.stringify(option) ===
              JSON.stringify(selectedAnswers[indexOfQuestion]);

            if (option.display.includes("<img")) {
              return (
                <div
                  data-testid="quiz-answer"
                  key={index}
                  onClick={() => setAnswer(option)}
                  className={`${
                    answerIsSelected ? style["answer-selected"] : style.answer
                  }`}
                  dangerouslySetInnerHTML={{ __html: option.display }}
                ></div>
              );
            } else {
              return (
                <div
                  data-testid="quiz-answer"
                  key={index}
                  onClick={() => setAnswer(option)}
                >
                  <p
                    className={`${
                      answerIsSelected ? style["answer-selected"] : style.answer
                    }`}
                  >
                    {option.display}
                  </p>
                </div>
              );
            }
          })}
        </div>
        {selectedAnswers[indexOfQuestion] &&
          selectedAnswers[indexOfQuestion].isRejection && (
            <p
              data-testid="quiz-rejection-message"
              className={`${style.text} body-3`}
            >
              Unfortunately, we are unable to prescribe this medication for you.
              is because finasteride can alter the PSA levels, which maybe used
              to monitor for cancer. You should discuss this further with your
              GP or specialist if you would still like this medication.
            </p>
          )}
        <div className={style["button-container"]}>
          <button
            className={style.button}
            onClick={() => route((parseInt(params.id) - 1).toString())}
            disabled={indexOfQuestion === 0}
          >
            <p className="body-4">Back</p>
          </button>
          {!isEndOfQuiz && (
            <button
              data-testid="quiz-next-button"
              className={style.button}
              onClick={() => route((parseInt(params.id) + 1).toString())}
              disabled={
                !selectedAnswers[indexOfQuestion] ||
                selectedAnswers[indexOfQuestion]?.isRejection
              }
            >
              <p className="body-4">Next</p>
            </button>
          )}
          {isEndOfQuiz && (
            <button
              data-testid="quiz-finish-button"
              className={style.button}
              onClick={() => route("/")}
            >
              <p className="body-4">Finish</p>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
