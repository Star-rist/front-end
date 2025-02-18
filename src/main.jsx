import { Buffer } from "buffer";
if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}
import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.jsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="https://gateway.pinata.cloud/ipfs/bafkreicttvfgvfhzltk4aqz4vmmzpxfs56znsf3vvwezvbcgehabky6rbm">
      <App />
    </TonConnectUIProvider>
    </React.StrictMode>
);