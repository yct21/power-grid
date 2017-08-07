import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/map";
import { DOMSource } from "@cycle/dom/rxjs-typings";
import { h } from "@cycle/dom";
import { VNode } from "snabbdom/vnode"
import { InitialParams, createStore } from "LandingPage/store";
import * as styles from "LandingPage/style.css";
import { Header } from "LandingPage/Header";
import { NameForm } from "LandingPage/NameForm";

interface PageParameters {
  storeInitialParameters: InitialParams,
  DOM: DOMSource,
}

export default function LandingPage(pageParameters: PageParameters) {
  const store = createStore(pageParameters.storeInitialParameters);
  const { DOM } = pageParameters;

  const header = Header({ DOM, store });
  const nameForm = NameForm({ DOM, store });

  const dom$ = Observable.combineLatest(
    [header.DOM, nameForm.DOM],
    (header: VNode, nameForm: VNode) => {
      return h(
        `div.${styles.landingPage}`,
        [ header, nameForm ],
      );
    }
  );

  header.DOM.map((header) => {
  });

  return {
    DOM: dom$,
  };
}
