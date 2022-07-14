import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
//Theme styled-component를 위한 import
import { ThemeProvider } from "styled-components";

//공통적용을 위해 만들어진 파일
import theme from './ThemeProvider';
import GlobalStyles from "./GlobalStyles";

import Meta from "./Meta";
import store from "./Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Meta/>
        <GlobalStyles/>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          </ThemeProvider>
      </Provider>
  </React.StrictMode>
);
