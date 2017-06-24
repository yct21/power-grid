import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider, observer, inject} from "mobx-react";

import { Store } from "stores";

@inject("appState") @observer
class App extends React.Component<{appState?: Store}, {}> {

  render() {
    return (
        <h1>!!Hello world </h1>
    );
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
