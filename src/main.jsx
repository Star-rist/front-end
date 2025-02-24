import { Buffer } from "buffer";
window.Buffer = Buffer;
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="https://gateway.pinata.cloud/ipfs/bafkreicttvfgvfhzltk4aqz4vmmzpxfs56znsf3vvwezvbcgehabky6rbm">
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);
