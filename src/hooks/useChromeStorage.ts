import { storage } from "../lib/chrome";
import { log } from "../lib/logger";

import type { ExtensionSettings } from "../types";

export function useChromeStorage() {
  const saveSettings = async (settings: Required<ExtensionSettings>) => {
    await storage.save(settings);
    log("Settings Saved", settings);
  };

  const loadSettings = async () => {
    const loadedSettings = await storage.load();
    log("Settings Loaded", loadedSettings);
    return loadedSettings;
  };

  return { saveSettings, loadSettings } as const;
}
