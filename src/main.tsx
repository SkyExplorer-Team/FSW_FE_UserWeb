import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Routes from "./routes";
import "./index.css";
import React from "react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <RecoilRoot>
    <BrowserRouter>
      <Routes />
      <App />
    </BrowserRouter>
  </RecoilRoot>
  // </React.StrictMode>
);
