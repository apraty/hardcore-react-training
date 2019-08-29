import React from "react";
import App from "./components/App";
import { createGlobalStyle } from "styled-components";
import { Normalize } from "styled-normalize";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./config/modelHelpers";
import money from "./assets/money.jpg";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Comic Sans MS";
    margin: 1em;
    font-size: 16px;
    background-image: url(${money});
  }
`;

const Root = props => {
  const { appModels } = props;

  return (
    <>
    <GlobalStyle/>
    <Normalize/>
    <Provider value={appModels}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
    </>
  );
};

export default Root;
