import LandingHelpWith from "./components/landing-help-with/landing-help-with";
import LandingQuiz from "./components/landing-quiz/landing-quiz";
import landingStyle from "./page.module.scss";

export default function Landing() {
  return (
    <>
      <LandingQuiz />
      <h2
        className={`${landingStyle["help-with"]} ${landingStyle["heading-3"]}`}
      >
        What can we help with
      </h2>
      <LandingHelpWith
        number="01"
        title="HAIR LOSS"
        subtitle="Hair loss needn’t be irreversible. We can help!"
        text="We’re working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out."
        image="/manual-landing-hair-loss.png"
        altImageName="Hair Loss"
        imageSide="left"
      />
      <LandingHelpWith
        number="02"
        title="ERECTILE DYSFUNCTION"
        subtitle="Erections can be a tricky thing. But no need to feel down!"
        text="We’re working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out."
        image="/manual-landing-erectile-dysfunction.png"
        altImageName="Erectile Dysfunction"
        imageSide="right"
      />
    </>
  );
}
