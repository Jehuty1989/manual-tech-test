import style from "./loading.module.scss";

export default function Loading() {
  return <div data-testid="loader" className={style.loader}></div>;
}
