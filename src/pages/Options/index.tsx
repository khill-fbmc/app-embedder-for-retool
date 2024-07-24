import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";

import { storage } from "../../lib/chrome";
import Options from "./Options";

const container = document.getElementById("app-container");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

storage.load().then((settings) => {
  root.render(<Options settings={settings} />);
});
