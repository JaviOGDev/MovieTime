import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SearchResultProvider } from "./context/SearchResultContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SearchResultProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SearchResultProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
