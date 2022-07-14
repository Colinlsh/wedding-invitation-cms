import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ScrollObserver from "./components/ui/ScrollObserver";
import { I18nextProvider } from "react-i18next";
import Layout from "./components/Layout";
import { i18n } from "./app/utils/translation";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollObserver>
          <I18nextProvider i18n={i18n}>
            <Layout>
              <App />
            </Layout>
          </I18nextProvider>
        </ScrollObserver>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
