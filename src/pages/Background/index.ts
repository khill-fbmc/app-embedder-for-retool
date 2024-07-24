import { getActiveTab, messages, storage } from "../../lib/chrome";
import { log } from "../../lib/logger";

messages.init();

messages.on("OPEN_OPTIONS", async () => {
  const tab = await getActiveTab();
  if (tab) {
    chrome.sidePanel.open({ tabId: tab.id });
  }
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

    messages.emitWorker("ON_INSTALLED", undefined, () => {});
  }
});
