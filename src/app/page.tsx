"use client";

import { useState } from "react";
import LandingHelpWith from "./components/landing-help-with/landing-help-with";
import LandingQuiz from "./components/landing-quiz/landing-quiz";
import { LandingHelpWithMockData } from "./mock-data/landing-help-with.mock-data";
import style from "./page.module.scss";

export default function Landing() {
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

  return (
    <>
      <LandingQuiz showQuiz={showQuiz} setShowQuiz={setShowQuiz} />
      {!showQuiz && (
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
      )}
    </>
  );
}
