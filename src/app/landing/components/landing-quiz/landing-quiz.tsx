import Image from "next/image";
import style from "./landing-quiz.module.scss";
import landingStyle from "../../page.module.scss";

export default function LandingQuiz() {
  return (
    <div className={style.container}>
      <Image
        className={style.icon}
        src={"/manual-icon.svg"}
        width={40}
        height={40}
        alt="Manual Icon"
      />
      <div className={style["text-container"]}>
        <h1 className={style.heading}>
          Be good
          <br />
          to yourself
        </h1>
        <p className={`${style.text} ${landingStyle["body-3"]}`}>
          We’re working around the clock to bring you a holistic approach to
          your wellness. From top to bottom, inside and out.
        </p>
        <button className={`${style.button} ${landingStyle["heading-7"]}`}>
          TAKE THE QUIZ
        </button>
      </div>
    </div>
  );
}
