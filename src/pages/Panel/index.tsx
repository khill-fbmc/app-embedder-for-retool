import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";

import { storage } from "../../lib/storage";
import Panel from "./Panel";

const container = document.getElementById("app-container");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

storage.load().then((settings) => {
  root.render(<Panel settings={settings} />);
});
