import { assert } from "chai";
import * as td from "testdouble";

describe("LandingPage/store", () => {
  it("Feature: it could create store with proper parameter", () => {
    // Given we could get initial parameter from caller
    const fakeDom = "fakeDom";
    const initialParams = {
      onlineNum: 42,
    };

    // And we could create onlineNum$ in store/onlineNum
    const fakeOnlineNum$ = "fakeOnlineNum$";
    const onlineNum = td.function();
    td.when(onlineNum(initialParams.onlineNum)).thenReturn(fakeOnlineNum$);
    td.replace("LandingPage/store/onlineNum", { onlineNum });

    // And we could create networkStatus$ in store/networkStatus
    const fakeNetworkStatus$ = "fakeNetworkStatus$";
    const networkStatus = td.function();
    td.when(networkStatus()).thenReturn(fakeNetworkStatus$);
    td.replace("LandingPage/store/networkStatus", { networkStatus });

    // And we could create UserName module in store/userName
    const fakeUserName$ = "fakeUserName";
    const userName = td.function();
    td.when(userName(fakeDom)).thenReturn(fakeUserName$);
    td.replace("LandingPage/store/userName", { userName });

    // When creating store
    const store = require("../index").createStore(initialParams, fakeDom);

    // Then it returns a store consists of onlineNum$
    assert.equal(store.onlineNum$, fakeOnlineNum$);

    // And networkStatus$
    assert.equal(store.networkStatus$, fakeNetworkStatus$);

    // And userName
    assert.equal(store.userName, fakeUserName$);
  });
});
