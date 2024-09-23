import { log } from "../lib/logger";
import { storage } from "../lib/storage";

import type { SerializedSettings } from "../lib/storage";

export function useChromeStorage() {
  const saveSettings = async (settings: Required<SerializedSettings>) => {
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
