/// <reference path="../../../node_modules/chrome-types/index.d.ts" />

import { storage } from "../../lib/chrome";
import { log } from "../../lib/logger";

chrome.commands.onCommand.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.sidePanel.open({ tabId: tab.id });
  });
});

chrome.runtime.onInstalled.addListener(async () => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  log("Loading Settings");

  const options = await storage.load();

  if (!options?.domain) {
    await storage.save({
      domain: "",
      app: "",
      env: "production",
      version: "latest",
      workflowUrl: "",
      workflowApiKey: "",
    });

    log("Default settings set.");
  }
});
