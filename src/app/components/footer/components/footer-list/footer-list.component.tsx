import style from "./footer-list.module.scss";
import Image from "next/image";

interface ListItem {
  text: string;
  link: string;
}

interface ListItemIconOptions {
  height: number;
  width: number;
}

interface ListItemIconDetails {
  src: string;
  altName: string;
  link: string;
  options?: ListItemIconOptions;
}

interface ListItemIcon {
  icons: ListItemIconDetails[];
}

export interface FooterListProps {
  title: string;
  listItems: ListItem[] | ListItemIcon[];
}

export default function FooterList({ title, listItems }: FooterListProps) {
  return (
    <div className={style.container}>
      <h3 className={`heading-7-bold`}>{title}</h3>
      <ul className={style.list}>
        {listItems.map((listItem, index) => (
          <li key={index}>
            {"text" in listItem && (
              <a href={listItem.link}>
                <p>{listItem.text}</p>{" "}
              </a>
            )}

            {"icons" in listItem && (
              <div className={style["icons-container"]}>
                {listItem.icons.map((icon, index) => (
                  <a key={index} href={icon.link}>
                    <Image
                      src={icon.src}
                      height={icon.options?.height ?? 24}
                      width={icon.options?.width ?? 24}
                      alt={icon.altName}
                    />
                  </a>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
