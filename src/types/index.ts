import type { RetoolUrlConfig } from "../lib//RetoolURL";

export * from "./events";

export type ParamEntry = {
  index: number;
  param: string;
  value: string;
};

type PartialRetoolUrl = Omit<RetoolUrlConfig, "embed" | "hideNav" | "hideTimer" | "historyOffset">;

export type ExtensionSettings = Partial<
  PartialRetoolUrl & {
    workflowUrl: string;
    workflowApiKey: string;
  }
>;
