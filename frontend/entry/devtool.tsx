import * as React from "react";

export const Devtool: React.SFC<{}> = () => {
  if (process.env.NODE_ENV === "development") {
    const DevTools = require("mobx-react-devtools").default;
    const configureDevtool = require("mobx-react-devtools").configureDevtool;

    configureDevtool({
      logEnabled: true,
    });

    return <DevTools />
  } else {
    return <h1>meow</h1>
  }
}
