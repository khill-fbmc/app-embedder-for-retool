import * as MessageBroker from "../../lib/MessageBroker";

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  MessageBroker.init();
});
