import { ChromeStorage } from "./ChromeStorage";

import type { UrlParamSpec } from "../hooks/useExtensionState";
import type { ExtensionSettings } from "../types";

export type SerializedSettings = {
  urlParams: UrlParamSpec[];
  hashParams: UrlParamSpec[];
} & Required<ExtensionSettings>;

export const storage = new ChromeStorage<SerializedSettings>();
