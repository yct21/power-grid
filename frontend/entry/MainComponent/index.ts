import { DOMSource } from "@cycle/dom/rxjs-typings";
import "rxjs/add/operator/switchMap";
import { switchPage$ } from "socket/switchPage";
import LandingPage from "LandingPage";
import { InitialParams as LandingPageInitialParameters } from "LandingPage/store";

// This is actully a router
export default function MainComponent({DOM: domSource}: {DOM: DOMSource}) {
  const view$ = switchPage$().switchMap((parameter: LandingPageInitialParameters) => {
    console.log(parameter)
    const page = LandingPage({ storeInitialParameters: parameter, DOM: domSource });

    return page.DOM;
  });

  return { DOM: view$ };
}
