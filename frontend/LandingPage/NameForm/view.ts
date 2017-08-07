import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { h } from "@cycle/dom";
import { Model } from "LandingPage/NameForm/model";
import * as styles from "LandingPage/NameForm/style.css";

export function view(model$: Observable<Model>) {
  return model$.map((props: Model) => {
    const { userName, onlineNum } = props;
    return h(`div.${styles.nameForm}`, [
      h("div", [
        h(`div.${styles.userNameField}`, [
          h("input", { value: userName }),
        ]),
        h(`div.${styles.onlineNumField}`, [
          onlineNum.toString(),
        ]),
      ]),
    ]);
  });
}
