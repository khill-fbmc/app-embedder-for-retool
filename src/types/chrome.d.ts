// chrome.d.ts

declare namespace chrome.runtime {
  interface ExtensionMessageEvent {
    /**
     * Adds a listener to the onMessage event.
     * @param listener The callback function to execute when a message is received.
     */
    addListener(listener: MessageListener): void;
  }

  interface RuntimeInstalledEvent {
    /**
     * Adds a listener to the onMessage event.
     * @param listener The callback function to execute when a message is received.
     */
    addListener(listener: MessageListener): void;
  }
}

declare namespace chrome.commands {
  interface CommandEvent {
    /**
     * Adds a listener to the onMessage event.
     * @param listener The callback function to execute when a message is received.
     */
    addListener(listener: MessageListener): void;
  }
}
