import { Observable } from "rxjs/Observable";
import { LandingPageStore } from "store/landingPageStore";
import { DOMSource, h3 } from "@cycle/dom";

interface PageParameter {
  props: Observable<LandingPageStore>,
  DOM: DOMSource,
};

export default function StartupTempPage(sources: PageParameter) {
  return {
    DOM: h3("Loading..."),
  };
}
