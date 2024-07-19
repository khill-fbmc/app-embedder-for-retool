import type { RetoolUrlConfig } from "../lib//RetoolURL";

export * from "./events";

export type ExtensionSettings = Partial<
  Omit<RetoolUrlConfig, "embed" | "hideNav" | "hideTimer" | "historyOffset">
>;
