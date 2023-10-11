import LandingHelpWith from "./components/landing-help-with/landing-help-with.component";
import LandingQuiz from "./components/landing-quiz/landing-quiz.component";
import { LandingHelpWithMockData } from "./mock-data/landing-help-with.mock-data";
import style from "./page.module.scss";
import Footer from "./components/footer/footer.component";

export default function Landing() {
  return (
    <>
      <LandingQuiz />
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
  );
}
