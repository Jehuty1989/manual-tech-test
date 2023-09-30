"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import style from "./quiz.module.scss";
import Image from "next/image";

type SelectedAnswerInterface = Record<number, QuizOption>;

enum QuizQuestionType {
  ChoiceType,
}

export interface QuizOption {
  display: string;
  value: string | boolean;
  isRejection: boolean;
}

export interface QuizQuestion {
  question: string;
  type: QuizQuestionType;
  options: QuizOption[];
}

export interface QuizProps {
  questions: QuizQuestion[];
  setShowQuiz: Dispatch<SetStateAction<boolean>>;
}

// Typically I would export the component as default
// however I had to export default enum QuizQuestionType
// to use it server side in quiz.mock-data.ts
export function Quiz({ questions, setShowQuiz }: QuizProps) {
  const [indexOfQuestion, setIndexOfQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] =
    useState<SelectedAnswerInterface>({});
  const [question, setQuestion] = useState<QuizQuestion>();
  const [howManyQuestions, setHowManyQuestions] = useState<number>(0);
  const [isEndOfQuiz, setIsEndOfQuiz] = useState<boolean>(false);
  const [footer] = document.getElementsByTagName("footer");

  useEffect(() => {
    footer.classList.add("display-none");

    return () => {
      footer.classList.remove("display-none");
    };
  });

  useEffect(() => {
    setHowManyQuestions(questions.length);
  }, [setHowManyQuestions, questions]);

  useEffect(() => {
    setQuestion(questions[indexOfQuestion]);
  }, [setQuestion, indexOfQuestion, questions]);

  const goToNextQuestion = useCallback((): void => {
    setIndexOfQuestion(indexOfQuestion + 1);
  }, [indexOfQuestion]);

  useEffect(() => {
    if (howManyQuestions > 0) {
      setIsEndOfQuiz(indexOfQuestion >= howManyQuestions);
    } else {
      setIsEndOfQuiz(false);
    }
  }, [setIsEndOfQuiz, indexOfQuestion, howManyQuestions]);

  const setAnswer = useCallback(
    (selectedAnswer: QuizOption): void => {
      const tempSelectedAnswers = selectedAnswers;
      tempSelectedAnswers[indexOfQuestion] = selectedAnswer;
      setSelectedAnswers({ ...tempSelectedAnswers });
    },
    [indexOfQuestion, selectedAnswers, setSelectedAnswers],
  );

  const goBackOneQuestion = useCallback((): void => {
    setIndexOfQuestion(indexOfQuestion - 1);
  }, [setIndexOfQuestion, indexOfQuestion]);

  const closeQuiz = useCallback((): void => {
    setShowQuiz(false);
  }, [setShowQuiz]);

  return (
    <div className={style.container}>
      <div className={style["close-icon-container"]}>
        <Image
          onClick={() => closeQuiz()}
          className={style["close-icon"]}
          src="/icons/close-icon.svg"
          height={24}
          width={24}
          alt="close"
        />
      </div>
      {isEndOfQuiz && (
        <p className={`${style.text} body-3`}>
          Great news! We have the perfect treatment for your hair loss. Proceed
          to{" "}
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
      <h1 className={`${style.text} heading-4`}>{question?.question}</h1>
      <div className={style["answers-container"]}>
        {question?.options.map((option, index) =>
          option.display.includes("<img") ? (
            <div
              key={index}
              onClick={() => setAnswer(option)}
              className={`${
                option === selectedAnswers[indexOfQuestion]
                  ? style["answer-selected"]
                  : style.answer
              }`}
              dangerouslySetInnerHTML={{ __html: option.display }}
            ></div>
          ) : (
            <div
              key={index}
              onClick={() => setAnswer(option)}
              className={`${
                option === selectedAnswers[indexOfQuestion]
                  ? style["answer-selected"]
                  : style.answer
              }`}
            >
              <p className="body-2">{option.display}</p>
            </div>
          ),
        )}
      </div>
      {selectedAnswers[indexOfQuestion] &&
        selectedAnswers[indexOfQuestion].isRejection && (
          <p className={`${style.text} body-3`}>
            Unfortunately, we are unable to prescribe this medication for you.
            is because finasteride can alter the PSA levels, which maybe used to
            monitor for cancer. You should discuss this further with your GP or
            specialist if you would still like this medication.
          </p>
        )}
      <div className={style["button-container"]}>
        <button
          className={style.button}
          onClick={() => goBackOneQuestion()}
          disabled={indexOfQuestion === 0}
        >
          <p className="body-4">Back</p>
        </button>
        {!isEndOfQuiz && (
          <button
            className={style.button}
            onClick={() => goToNextQuestion()}
            disabled={
              !selectedAnswers[indexOfQuestion] ||
              selectedAnswers[indexOfQuestion]?.isRejection
            }
          >
            <p className="body-4">Next</p>
          </button>
        )}
        {isEndOfQuiz && (
          <button className={style.button} onClick={() => closeQuiz()}>
            <p className="body-4">Finish</p>
          </button>
        )}
      </div>
    </div>
  );
}

// exported this as default to use it server side
export default QuizQuestionType;
