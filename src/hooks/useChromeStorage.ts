import * as storage from "../lib/chrome.storage";

export function useChromeStorage<T extends Record<string, unknown>>() {
  const saveSettings = async (settings: T) => {
    await storage.set<T>(settings);
    console.log("Settings Saved", settings);
  };

  const loadSettings = async () => {
    const loadedSettings = await storage.get<T>();
    console.log("Settings Loaded", loadedSettings);
    return loadedSettings;
  };

  return { saveSettings, loadSettings } as const;
}
