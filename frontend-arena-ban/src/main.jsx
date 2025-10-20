// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SWRConfig } from "swr";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <App />
    </SWRConfig>
  </React.StrictMode>
);
