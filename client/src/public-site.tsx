import React from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "./redesign/HomePage";
import { WorksPage } from "./redesign/WorksPage";
import { ProfilePage } from "./redesign/ProfilePage";
import { restoreLegacyLocation } from "./redesign/legacy-location";
import "./redesign/style.css";

if (!restoreLegacyLocation()) {
  const pathname = location.pathname
    .replace(/\/index\.html$/, "/")
    .replace(/\/$/, "");
  const Page =
    pathname === "/works"
      ? WorksPage
      : pathname === "/profile"
        ? ProfilePage
        : HomePage;
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Page />
    </React.StrictMode>
  );
}
