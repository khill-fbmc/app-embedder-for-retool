import { stringifyCSSProperties as css } from "react-style-stringify";

import type { CSSProperties } from "react";

const style: CSSProperties = {
  backgroundColor: "rgb(248, 249, 250)",
  color: "#000",
  fontSize: "9px",
  padding: "0 5px",
  borderRadius: "10px",
};

export const log = (...args: unknown[]) => {
  console.log("%cApp Embedder For Retool", css(style), ...args);
};

export const debug = (...args: unknown[]) => {
  if (process.env.DEBUG) log(...args);
};
