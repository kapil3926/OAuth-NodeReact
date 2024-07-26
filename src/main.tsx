import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      clientId={import.meta.env.VITE_CLIENT_ID}
      domain={import.meta.env.VITE_DOMAIN}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_UNIQUE_IDENTIFIER,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);