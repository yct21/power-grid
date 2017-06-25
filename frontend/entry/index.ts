// import renderApp from "entry/renderApp";
const { createStore } = require("stores");

// This is the entry of frontend part.
// We should start up our application here.
// Including
// - Set up a temperory state
// - Render a temperory page
// - Connect websocket

// state part
const appState = createStore();
console.log(appState);

// rendering part
// renderApp(appState);

// socket.io part
