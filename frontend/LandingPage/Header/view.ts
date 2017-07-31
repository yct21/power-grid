import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { h } from "@cycle/dom";
import { Model } from "LandingPage/Header/model";
import * as styles from "LandingPage/Header/style.css";

export function view(model$: Observable<Model>) {
  return model$.map((props: Model) => {
    if (props.networkStatus === "online") {
      const { networkStatus } = props;
      return h(`div.${styles.header}`, [
        h(`div.${styles.content}`, [
          h(`div.${styles.title}`, [
            "Power Grid"
          ]),
          h(`div.${styles.networkStatus}`, [
            networkStatus.toString(),
          ]),
        ]),
      ]);
    }
    return h("h1.meow", "title");
  });
}
