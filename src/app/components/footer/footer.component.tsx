import style from "./footer.module.scss";
import Image from "next/image";
import FooterList from "./components/footer-list/footer-list.component";
import { FooterListItemsMockData } from "./mock-data/footer-list.mock-data";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <Image
          className={style.icon}
          src={"/icons/manual-icon.svg"}
          width={75}
          height={75}
          alt="Manual Icon"
        />
        <div className={style["footer-list-container"]}>
          {FooterListItemsMockData.map((footerListItem, index) => (
            <FooterList
              key={index}
              title={footerListItem.title}
              listItems={footerListItem.listItems}
            />
          ))}
        </div>
      </div>
      <p className={`${style["rights-reserved"]} body-4`}>
        © 2023 Manual. All rights reserved
      </p>
    </footer>
  );
}
