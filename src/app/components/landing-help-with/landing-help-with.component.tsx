import Image from "next/image";
import style from "./landing-help-with.module.scss";

interface HelpWithImageProps {
  imageUrl: string;
  altImageName: string;
}

export interface LandingHelpWithProps extends HelpWithImageProps {
  number: string;
  title: string;
  subtitle: string;
  text: string;
  imageSide: "left" | "right";
}

function HelpWithImage({ imageUrl, altImageName }: HelpWithImageProps) {
  return (
    <div className={style["image-container"]}>
      <Image
        className={style.image}
        src={imageUrl}
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
  imageUrl,
  altImageName,
  imageSide,
}: LandingHelpWithProps) {
  return (
    <div className={style.container}>
      {imageSide === "left" && (
        <HelpWithImage imageUrl={imageUrl} altImageName={altImageName} />
      )}

      <div className={style["text-container"]}>
        <h3 className={`${style.title} heading-7`}>{title}</h3>
        <h4 className={`${style.subtitle} heading-4`}>{subtitle}</h4>
        <p>{text}</p>
        <p className={style[`number-${imageSide}`]}>{number}</p>
      </div>

      {imageSide === "right" && (
        <HelpWithImage imageUrl={imageUrl} altImageName={altImageName} />
      )}
    </div>
  );
}
