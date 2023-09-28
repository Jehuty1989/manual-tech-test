import Image from "next/image";
import style from "./landing-help-with.module.scss";
import landingStyle from "../../page.module.scss";

interface HelpWithImageProps {
  image: string;
  altImageName: string;
}

interface LandingHelpWithProps extends HelpWithImageProps {
  number: string;
  title: string;
  subtitle: string;
  text: string;
  imageSide: "left" | "right";
}

function HelpWithImage({ image, altImageName }: HelpWithImageProps) {
  return (
    <div className={style["image-container"]}>
      <Image
        className={style.image}
        src={image}
        alt={altImageName}
        fill={true}
      />
    </div>
  );
}

export default function LandingHelpWith({
  number,
  title,
  subtitle,
  text,
  image,
  altImageName,
  imageSide,
}: LandingHelpWithProps) {
  return (
    <div className={style.container}>
      {imageSide === "left" && (
        <HelpWithImage image={image} altImageName={altImageName} />
      )}

      <div className={style["text-container"]}>
        <h3 className={`${style.title} ${landingStyle["heading-7"]}`}>
          {title}
        </h3>
        <h4 className={`${style.subtitle} ${landingStyle["heading-4"]}`}>
          {subtitle}
        </h4>
        <p>{text}</p>
        <p className={style[`number-${imageSide}`]}>{number}</p>
      </div>

      {imageSide === "right" && (
        <HelpWithImage image={image} altImageName={altImageName} />
      )}
    </div>
  );
}
