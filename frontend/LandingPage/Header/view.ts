import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { h } from "@cycle/dom";
import { Model } from "LandingPage/Header/model";

export function view(model$: Observable<Model>) {
  return model$.map((props: Model) => {
    return h("h1.meow", "meow");
  });
}
