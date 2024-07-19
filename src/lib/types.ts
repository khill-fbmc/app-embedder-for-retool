import type { RetoolUrlConfig } from "./RetoolURL";

export type ExtensionSettings = Partial<
  Omit<RetoolUrlConfig, "embed" | "hideNav" | "hideTimer" | "historyOffset">
>;
