import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import AppModels from "./models/AppModels";

library.add(faSpinner);

const initialState = false;

const appModels = AppModels.create({});

// Just a small DRY abstraction here.
function render(Component, rootElement, method = "render") {
  ReactDOM[method](<Component appModels={appModels}/>, rootElement);
}

// If we get !undefined state from the server, we hydrate.
const rootElement = document.getElementById("app");
render(Root, rootElement, initialState ? "hydrate" : "render");

// Webpack's hot reloading magic happens here.
if (module.hot) {
  module.hot.accept("./Root", () => {
    const HotReloadedRoot = require("./Root").default;
    render(HotReloadedRoot, rootElement, "render");
  });
}

console.log("In the browser console, also suckling on a duckling?!?");
