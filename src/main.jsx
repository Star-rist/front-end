import { Buffer } from "buffer";
globalThis.Buffer = Buffer; // Ensures Buffer is available globally

import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.jsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

// Ensure Buffer is globally available
if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <TonConnectUIProvider manifestUrl="https://starist.vercel.app/data.json">
      <App />
    </TonConnectUIProvider>
  </Provider>
);
