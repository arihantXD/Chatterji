import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <NextUIProvider>
    <App />
    <Toaster
      position="bottom-center"
      gutter={8}
      toastOptions={{
        duration: 3000,
      }}
    />
  </NextUIProvider>
  //  </React.StrictMode>
);
