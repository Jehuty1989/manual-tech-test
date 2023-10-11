"use client";

import { useEffect, useState } from "react";
import LandingHelpWith from "./components/landing-help-with/landing-help-with.component";
import LandingQuiz from "./components/landing-quiz/landing-quiz.component";
import { LandingHelpWithMockData } from "./mock-data/landing-help-with.mock-data";
import style from "./page.module.scss";
import { Quiz, QuizQuestion } from "./components/quiz/quiz.component";
import { QuizMockDataInterface } from "./api/quiz/route";
import Footer from "./components/footer/footer.component";
import Loading from "../components/loading/loading.component";
import QuizError from "./components/quiz-error/quiz-error.component";

export default function Landing() {
  const [loading, setLoading] = useState<boolean>(true);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>();

  useEffect(() => {
    fetch("/api/quiz")
      .then((res) => res.json())
      .then((data: QuizMockDataInterface) => {
        // console.log(data);
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [setQuestions, setLoading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className={showQuiz ? "" : style.hide}>
        {questions ? (
          <Quiz questions={questions} setShowQuiz={setShowQuiz} />
        ) : (
          <QuizError setShowQuiz={setShowQuiz} />
        )}
      </div>
      {!loading && !showQuiz && (
        <>
          <LandingQuiz showQuiz={showQuiz} setShowQuiz={setShowQuiz} />
          <div>
            <h2 className={`${style["help-with"]} heading-3`}>
              What can we help with
            </h2>
            {LandingHelpWithMockData.map((landingHelpWithItem, index) => (
              <LandingHelpWith
                key={index}
                number={landingHelpWithItem.number}
                title={landingHelpWithItem.title}
                subtitle={landingHelpWithItem.subtitle}
                text={landingHelpWithItem.text}
                imageUrl={landingHelpWithItem.imageUrl}
                altImageName={landingHelpWithItem.altImageName}
                imageSide={landingHelpWithItem.imageSide}
              />
            ))}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
