import * as td from "testdouble";
import { assert } from "chai";

describe("LandingPage/store/networkStatus", () => {
  it("returns a stream of networkStatus in socket", () => {
    // Given we could create networkStatus in socket/networkStatus
    const fakeNetworkStatus$ = "fakeNetworkStatus$";
    const networkStatus$ = td.function();
    td.when(networkStatus$()).thenReturn(fakeNetworkStatus$);
    td.replace("socket/networkStatus", { networkStatus$ });

    // When create networkStatus$
    const storeNetworkStatus$ = require("../networkStatus").networkStatus();

    // Then it returns the stream create in socket/networkStatus
    assert.equal(storeNetworkStatus$, fakeNetworkStatus$);
  });
});
