import { ChromeStorage } from "../lib/chrome.storage";
import { log } from "../lib/logger";

import type { ExtensionSettings } from "../types";

export function useChromeStorage() {
  const storage = new ChromeStorage<ExtensionSettings>();

  const saveSettings = async (settings: ExtensionSettings) => {
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
