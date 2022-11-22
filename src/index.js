import React from "react";
// import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
// import { createRoot } from "react-dom/client";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ContextProviders from "./context";
// const container = document.getElementById("root");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ContextProviders>
      <App />
    </ContextProviders>
  </BrowserRouter>
);
// ReactDOM.render(
//   document.getElementById("root")
// );
