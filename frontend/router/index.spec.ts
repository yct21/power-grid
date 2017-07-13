import * as td from "testdouble";
import { assert } from "chai";
import "rxjs/add/observable/of";
import { TestScheduler } from "rxjs/testing/TestScheduler";

describe("router/index", () => {
  describe("Feature: router routes props to different page by its storeName", () => {
    it("Scenerio: when props is a startupTempPage", () => {
      const scheduler = new TestScheduler(assert.deepEqual);
      // Given a domSource from parent node
      const fakeDomSource = "fakeDomSource";

      // And props of startupTempStore
      const fakeProps$ = scheduler.createHotObservable(
        "-x-", {
          x: {
            storeName: "StartupTempStore",
          }
        }
      );

      // And corresponding component
      const fakeStartupTempPageDom = "fakeStartupTempPage";
      const fakeStartupTempPage = td.function("fakeStartupTempPage");
      td.when(
        fakeStartupTempPage({
          DOM: fakeDomSource,
          props: fakeProps$,
        })).thenReturn({
          DOM: fakeStartupTempPageDom,
        }
      );
      td.replace("StartupTempPage", { default: fakeStartupTempPage });

      // When rendering router
      const Router = require("./index").default;
      const router = Router({ DOM: fakeDomSource, props: fakeProps$ });

      // Then StartupTempPage component is called with proper parameters
      // And its DOM is rendered as DOM of Router
      const routerDom$ = router.DOM;
      scheduler.expectObservable(routerDom$).toBe("-x-", {
        x: fakeStartupTempPageDom,
      });
      scheduler.flush();
    });

    it("Scenerio: when props is a landingPageStore", () => {
      const scheduler = new TestScheduler(assert.deepEqual);

      // Given proper props from parent
      const fakeDomSource = "fakeDomSource";
      const fakeProps$ = scheduler.createColdObservable(
        "--x--xxx-", {
          x: {
            storeName: "LandingPageStore",
          }
        }
      )

      // And LandingPage component
      const fakeLandingPageDom = "fakeLandingPageDom";
      const fakeLandingPage = td.function("fakeLandingPage");
      td.when(
        fakeLandingPage({
          DOM: fakeDomSource,
          props: fakeProps$,
        })
      ).thenReturn({
        DOM: fakeLandingPageDom,
      });
      td.replace("LandingPage", { default: fakeLandingPage });

      // When rendering router
      const Router = require("./index").default;
      const router = Router({ DOM: fakeDomSource, props: fakeProps$ });

      // Then LandingPage component is called with proper parameters
      // And its DOM is rendered as DOM of Router
      const routerDom$ = router.DOM;
      scheduler.expectObservable(routerDom$).toBe("--x--xxx-", {
        x: fakeLandingPageDom,
      });
      scheduler.flush();
    });
  })
});
