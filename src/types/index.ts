import type { RetoolUrlConfig } from "../lib/RetoolURL";

export * from "./events";
export * from "./extension";

type PartialRetoolUrl = Omit<RetoolUrlConfig, "embed" | "hideNav" | "hideTimer" | "historyOffset">;

export type ExtensionSettings = Partial<
  PartialRetoolUrl & {
    workflowUrl: string;
    workflowApiKey: string;
  }
>;
