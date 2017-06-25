import * as td from "testdouble";

const fakeCreateStore = td.function();
const fakeStore = td.object("fake store");
td.when(fakeCreateStore()).thenReturn(fakeStore);
td.replace("stores", { createStore: fakeCreateStore });

// And `renderApp` is mocked
const fakeRenderApp = td.function();
td.replace("entry/renderApp", { default: fakeRenderApp });

// When App entry is loaded
require("./index");

// Then it should set up a temperory store for loading
td.verify(fakeCreateStore());

// And it should render a temperory page
td.verify(fakeRenderApp(fakeStore));
