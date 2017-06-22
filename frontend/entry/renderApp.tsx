import * as React from "react";
import * as ReactDOM from "react-dom";
// import {Provider} from "mobx-react";
// import {Router, Route, IndexRoute, browserHistory} from "react-router";

// const appState = {};

export function App() {
  // <Provider appState={appState}>
  //   <Router history={browserHistory}>
  //     <Route path="/" component={App}>
  //       <IndexRoute component={Empty} />
  //     </Route>
  //   </Router>
  // </Provider>
  return <h1>Hello world</h1>
};

export default function renderApp() {
  ReactDOM.render(
    <App />,
    document.getElementById("app"),
  );
}
