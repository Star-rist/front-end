import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.jsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { Buffer } from "buffer";

// Ensure Buffer is globally available
if (!window.Buffer) {
  window.Buffer = Buffer;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <TonConnectUIProvider manifestUrl="https://plum-elaborate-anaconda-442.mypinata.cloud/ipfs/Qmcrx45yqEk8nwKnGVokKtPLccUAYWfzKq8nmNq7vJvfie">
      <App />
    </TonConnectUIProvider>
  </Provider>
);