"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { QuizContext, SELECTED_ANSWERS_KEY } from "../../contexts/quiz.context";
import style from "./page.module.scss";
import { useRouter } from "next/navigation";
import CloseIcon from "../../../components/close-icon/close-icon.component";
import QuizError from "../../components/quiz-error/quiz-error.component";
import Loading from "../../../components/loading/loading.component";

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

export default function Quiz({ params }: { params: { id: string } }) {
  const indexOfQuestion = parseInt(params.id) - 1;
  const router = useRouter();
  const { questions, selectedAnswers, setSelectedAnswers } =
    useContext(QuizContext);
  const howManyQuestions = questions.length;
  const question = questions[indexOfQuestion];
  const isEndOfQuiz = indexOfQuestion >= howManyQuestions;

  const routeIsIncorrect = useCallback((): boolean => {
    const howManySelectedAnswers = selectedAnswers.length;
    return (
      Number.isNaN(indexOfQuestion) ||
      indexOfQuestion < 0 ||
      indexOfQuestion > howManySelectedAnswers
    );
  }, [indexOfQuestion, selectedAnswers.length]);

  useEffect(() => {
    const howManySelectedAnswers = selectedAnswers.length;

    if (routeIsIncorrect()) {
      router.replace(`/quiz/${howManySelectedAnswers + 1}`);
    }

    if (selectedAnswers) {
      if (routeIsIncorrect()) {
        router.replace(`/quiz/${howManySelectedAnswers + 1}`);
      }

      setSelectedAnswers(selectedAnswers);
    } else if (!selectedAnswers && routeIsIncorrect()) {
      router.replace(`/quiz/${howManySelectedAnswers + 1}`);
    }
  }, [setSelectedAnswers, router, routeIsIncorrect, selectedAnswers]);

  const setAnswer = useCallback(
    (selectedAnswer: QuizOption): void => {
      const tempSelectedAnswers = selectedAnswers;
      tempSelectedAnswers[indexOfQuestion] = selectedAnswer;
      setSelectedAnswers([...tempSelectedAnswers]);
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

  const restartQuiz = useCallback((): void => {
    localStorage.removeItem(SELECTED_ANSWERS_KEY);
    setSelectedAnswers([]);
    router.replace("/quiz/1");
  }, [router, setSelectedAnswers]);

  if (questions.length < 1) {
    return <QuizError />;
  }

  if (routeIsIncorrect()) {
    return <Loading />;
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
                  // I wouldn't use this but it will render the image
                  // if there is a small typo, may be better to render
                  // an error image instead
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
        <div className={style["button-container"]}>
          <button
            className={style.button}
            onClick={restartQuiz}
            disabled={selectedAnswers.length < 1}
          >
            <p className="body-4">Restart</p>
          </button>
        </div>
      </div>
    </>
  );
}
