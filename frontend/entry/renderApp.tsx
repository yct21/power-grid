import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider, observer, inject} from "mobx-react";

import { Store } from "stores";
import { modifyContent } from "stores/startupTempStore";
import { Devtool } from "entry/devtool";

@inject("appState") @observer
class App extends React.Component<{appState?: Store}, {}> {
  render() {
    if (!this.props.appState) {
      throw new Error("appState not existed");
    } else {
      const appState: Store = this.props.appState;
      if (appState.storeName === "StartupTempStore") {
        return (
          <div>
            <button onClick={(e) => modifyContent(appState)}>{appState.someContent}</button>
            <Devtool />
          </div>
        );
      } else {
        return (
            <h1>!!Hello world </h1>
        );
      }
    }
  }
};

export default function renderApp(appState: Store) {
  ReactDOM.render(
    <Provider appState={appState}>
      <App />
    </Provider>,
    document.getElementById("app"),
  );
}
