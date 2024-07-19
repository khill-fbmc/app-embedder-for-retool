import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";

import * as storage from "../../lib/chrome.storage";
import Panel from "./Panel";

import type { ExtensionSettings } from "../../types";

const container = document.getElementById("app-container");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

storage.get<ExtensionSettings>().then((settings) => {
  root.render(<Panel settings={settings} />);
});
