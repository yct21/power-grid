import * as td from "testdouble";
import { assert } from "chai";
import "rxjs/add/observable/of";
import { TestScheduler } from "rxjs/testing/TestScheduler";

describe("router/index", () => {
  describe("when props is a startupTempPage", () => {
    const scheduler = new TestScheduler(assert.deepEqual);
    it("renders a start up temporary page", () => {
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

      // And start up temporary page component
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
      td.replace("pages/StartupTempPage", { default: fakeStartupTempPage });

      // When rendering router
      const Router = require("./index").default;
      const router = Router({ DOM: fakeDomSource, props: fakeProps$ });

      // Then LandingPage component is called with proper parameters
      // And its DOM is rendered as DOM of Router
      const routerDom$ = router.DOM;
      scheduler.expectObservable(routerDom$).toBe("-x-", {
        x: fakeStartupTempPageDom,
      })
      scheduler.flush();
    });
  });
});
