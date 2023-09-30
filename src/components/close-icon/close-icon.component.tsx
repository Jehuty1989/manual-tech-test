import style from "./close-icon.module.scss";
import Image from "next/image";

interface CloseIconInterface {
  onClick: () => void;
}

export default function CloseIcon({ onClick }: CloseIconInterface) {
  return (
    <div className={style["close-icon-container"]}>
      <Image
        onClick={() => onClick()}
        className={style["close-icon"]}
        src="/icons/close-icon.svg"
        height={24}
        width={24}
        alt="close"
      />
    </div>
  );
}
