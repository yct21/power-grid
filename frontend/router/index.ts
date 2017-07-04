import { Store } from "stores";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { DOMSource } from "@cycle/dom";
import StartupTempPage from "pages/StartupTempPage";

interface RouterParameter {
  props: Observable<Store>,
  DOM: DOMSource,
}

export default function Router(sources: RouterParameter) {
  const props$ = sources.props;
  const domSource = sources.DOM;

  const routerDom$ = props$.map((props) => {
    if (props.storeName === "StartupTempStore") {
      const page = StartupTempPage({ props: props$, DOM: domSource });
      return page.DOM;
    } else {
      return {};
    }
  })

  return {
    DOM: routerDom$,
  };
}
