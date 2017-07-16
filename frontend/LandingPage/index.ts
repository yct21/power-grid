import { Observable } from "rxjs/Observable";
import { LandingPageStore } from "LandingPage/store";
import { DOMSource, h } from "@cycle/dom";
import * as styles from "LandingPage/style.css";

interface PageParameter {
  props: Observable<LandingPageStore>,
  DOM: DOMSource,
};

export default function LandingPage(sources: PageParameter) {
  console.log(styles);
  const dom$ = h(
    `div.${styles.landingPage}`,
    h("h3", "meow"),
  );

  return {
    DOM: dom$,
  };
}
