"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import style from "./quiz.module.scss";

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
  const [isAnswerRejected, setIsAnswerRejected] = useState<boolean>(false);

  useEffect(() => {
    setHowManyQuestions(questions.length);
  }, [setHowManyQuestions, questions]);

  useEffect(() => {
    setQuestion(questions[indexOfQuestion]);
  }, [setQuestion, indexOfQuestion, questions]);

  const goToNextQuestion = useCallback(
    (selectedAnswer: QuizOption): void => {
      if (!selectedAnswer.isRejection) {
        setIndexOfQuestion(indexOfQuestion + 1);
      }
    },
    [indexOfQuestion],
  );

  useEffect(() => {
    if (howManyQuestions > 0) {
      setIsEndOfQuiz(indexOfQuestion >= howManyQuestions);
    } else {
      setIsEndOfQuiz(false);
    }
  }, [setIsEndOfQuiz, indexOfQuestion, howManyQuestions]);

  // const isAnswerRejection = useCallback(
  //   (selectedAnswer: QuizOption): boolean => {
  //     set;
  //   },
  //   [],
  // );

  const setAnswer = useCallback(
    (selectedAnswer: QuizOption): void => {
      const tempSelectedAnswers = selectedAnswers;
      tempSelectedAnswers[indexOfQuestion] = selectedAnswer;
      setSelectedAnswers({ ...tempSelectedAnswers });
      goToNextQuestion(selectedAnswer);
    },
    [indexOfQuestion, selectedAnswers, setSelectedAnswers, goToNextQuestion],
  );

  const goBackOneQuestion = useCallback((): void => {
    setIndexOfQuestion(indexOfQuestion - 1);
  }, [setIndexOfQuestion, indexOfQuestion]);

  return (
    <div>
      {isEndOfQuiz && (
        <p>
          Great news! We have the perfect treatment for your hair loss. Proceed
          to{" "}
          <a href="https://www.manual.co" target="_blank">
            www.manual.co
          </a>
          , and prepare to say hello to your new hair!
        </p>
      )}
      {question?.question}
      <div className={style["questions-container"]}>
        {question?.options.map((option, index) => (
          <div
            key={index}
            onClick={() => setAnswer(option)}
            className={`${
              option === selectedAnswers[indexOfQuestion]
                ? style["question-selected"]
                : style.question
            }`}
            dangerouslySetInnerHTML={{ __html: option.display }}
          ></div>
        ))}
      </div>
      {selectedAnswers[indexOfQuestion] &&
        selectedAnswers[indexOfQuestion].isRejection && (
          <p>
            Unfortunately, we are unable to prescribe this medication for you.
            is because finasteride can alter the PSA levels, which maybe used to
            monitor for cancer. You should discuss this further with your GP or
            specialist if you would still like this medication.
          </p>
        )}
      <button
        onClick={() => goBackOneQuestion()}
        disabled={indexOfQuestion === 0}
      >
        Back
      </button>
    </div>
  );
}

// exported this as default to use it server side
export default QuizQuestionType;
