import { ChromeStorage } from "./chrome/ChromeStorage";

import type { ExtensionSettings, ParamEntry } from "../types";

export type SerializedSettings = {
  urlParams: ParamEntry[];
  hashParams: ParamEntry[];
} & Required<ExtensionSettings>;

export const storage = new ChromeStorage<SerializedSettings>();
