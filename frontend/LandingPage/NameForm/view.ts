import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { h } from "@cycle/dom";
import { Model } from "LandingPage/NameForm/model";
import * as styles from "LandingPage/NameForm/style.css";

function onlineNumText(onlineNum: number) {
  if (onlineNum === 1) {
    return "1 Player Online";
  } else {
    return `${onlineNum} Players Online`;
  }
}

export function view(model$: Observable<Model>) {
  const userNameFieldLength = 15;

  return model$.map((props: Model) => {
    const { userName, userNameFocus, onlineNum } = props;
    const focusClass = { class: { [ styles.active ]: userNameFocus }};

    return h(`div.${styles.nameForm}`, [
      h("div", [
        // Not going to extract it to a MaterialInput component
        // until we met another Input(type="text")
        h(`div.${styles.userNameField}`, [
          h(`label.${styles.userNameFieldLabel}`,  "Player Name"),
          h(`input.${styles.userNameFieldInput}`, { props: {
            value: userName,
            maxLength: userNameFieldLength,
            autocomplete: "off",
            autocorrect: "off",
            autocapitalize: "off",
            spellcheck: false,
          }}),
          h("div", [
            h(`hr.${styles.userNameFieldBr}`),
            h(`hr.${styles.userNameFieldBr2}`, focusClass),
          ]),
        ]),
        h(`div.${styles.onlineNumField}`, [
          onlineNumText(onlineNum),
        ]),
      ])
    ]);
  });
}
