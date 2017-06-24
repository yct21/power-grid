import renderApp from "entry/renderApp";
import { createStore } from "stores";
import { observable } from "mobx";

const appState = observable(createStore());

renderApp(appState);
