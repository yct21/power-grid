import "rxjs/add/operator/map";
import { StoreInitialParameters, createStore } from "LandingPage/store";
import { DOMSource, h } from "@cycle/dom";
import * as styles from "LandingPage/style.css";
import { Header } from "LandingPage/Header";

interface PageParameters {
  storeInitialParameters: StoreInitialParameters,
  DOM: DOMSource,
}

export default function LandingPage(pageParameters: PageParameters) {
  const store = createStore(pageParameters.storeInitialParameters);
  const header = Header({ DOM: pageParameters.DOM, store });

  const dom$ = header.DOM.map((header) => {
    return h(
      `div.${styles.landingPage}`,
      header
    );
  });

  return {
    DOM: dom$,
  };
}
