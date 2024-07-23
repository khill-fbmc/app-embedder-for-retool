import * as MessageBroker from "../../lib/chrome.messages";
import * as storage from "../../lib/chrome.storage";
import { log } from "../../lib/logger";

import type { ExtensionSettings } from "../../types";

MessageBroker.init();

MessageBroker.on("OPEN_OPTIONS", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;
      chrome.sidePanel.open({ tabId });
    }
  });
});

chrome.runtime.onInstalled.addListener(async () => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  log("Loading Settings");

  const options = await storage.get<ExtensionSettings>();
  if (!options?.domain) {
    await storage.set<ExtensionSettings>({
      domain: undefined,
      app: undefined,
      env: "production",
      version: "latest",
    });

    log("Default settings set.");

    MessageBroker.emitWorker("ON_INSTALLED", undefined, () => {});
  }
});
