import React from "react";
import { Provider } from "react-redux";
import App from "./components/containers/AppContainer";
import { BrowserRouter } from "react-router-dom";

const Root = props => {
  const { store } = props;

  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
