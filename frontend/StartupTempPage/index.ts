import { Observable } from "rxjs";
import { DOMSource, h3 } from "@cycle/dom";
import { StartupTempStore } from "StartupTempPage/store";

interface PageParameter {
  props: Observable<StartupTempStore>,
  DOM: DOMSource,
};

export default function StartupTempPage(sources: PageParameter) {
  return {
    DOM: h3("Loading..."),
  };
}
