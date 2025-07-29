// Impor - default
import "./init";
// import "draft-js/dist/Draft.css";

// Import - assets (css files)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./assets/css/draft-editor.css";
import "./assets/css/file-upload.css";
import "./assets/css/globals.css";
import "./assets/css/inputs.css";
import "./assets/css/scrollbar.css";
import "./assets/css/swiper.css";

// Import - default
import React from "react";
import ReactDOM from "react-dom/client";

// Import - helpers
import ToastProvider from "./helpers/contexts/ToastContext.tsx";

// Import - relative
import App from "./App.tsx";

// Main
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
);
