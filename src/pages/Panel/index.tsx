import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";

import Panel from "./components/Panel";

const container = document.getElementById("app-container");
const root = createRoot(container!);

root.render(<Panel />);
