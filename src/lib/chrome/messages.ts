import { log } from "../logger";
import { getActiveTab } from "./tabs";

import type { MyEvents } from "../../types";

const MESSAGE_TAG = "MessageBroker" as const;

const handlers: Handlers<keyof MyEvents> = {};

// Initialize the event emitter to start listening for messages
function init(): void {
  log("Initializing MessageBroker");
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.__tag === MESSAGE_TAG) {
      handleMessage(message, sender).then(sendResponse);
    }
    return true;
  });
}

// Register an event handler for a specific event type
function on<K extends keyof MyEvents>(event: K, handler: EventHandler<K>): void {
  log(`Registering Handler: "${event}"`);
  if (!handlers[event]) {
    handlers[event] = [];
  }
  handlers[event].push(handler);
}

// Emit an event with the specified payload and get a response using chrome.tabs.sendMessage
async function emit<K extends keyof MyEvents>(
  event: K,
  payload?: EventInput<K>,
  reply?: (response: EventHandlerOutput<K>) => void
): Promise<void> {
  const taggedData = Object.assign(payload || {}, { __tag: MESSAGE_TAG });
  log(`Emitting To Tabs: "${event}"`, taggedData);
  const tab = await getActiveTab();
  if (tab?.id) {
    sendMessageToTab(tab.id, event, taggedData, reply);
  } else {
    reply?.({ error: "There was no active tab found" });
  }
}

// Emit an event with the specified payload and get a response using chrome.runtime.sendMessage
async function emitWorker<K extends keyof MyEvents>(
  event: K,
  payload?: EventInput<K>,
  reply?: (response: EventHandlerOutput<K>) => void
): Promise<void> {
  const taggedData = Object.assign(payload ?? {}, { __tag: MESSAGE_TAG });
  log(`Emitting To Runtime: "${event}"`, taggedData);
  sendMessageToRuntime(event, taggedData, reply);
}

// Internal method to send a message to a tab and handle the response
async function sendMessageToTab<K extends keyof MyEvents>(
  tabId: number,
  event: K,
  payload?: EventInput<K>,
  reply?: (response: EventHandlerOutput<K>) => void
): Promise<void> {
  const response = (await chrome.tabs.sendMessage(tabId, {
    event,
    payload,
  })) as EventOutput<K>;
  handleSendMessageResponse(response, reply);
}

// Internal method to send a message to the runtime and handle the response
function sendMessageToRuntime<K extends keyof MyEvents>(
  event: K,
  payload?: EventInput<K>,
  reply?: (response: EventHandlerOutput<K>) => void
): void {
  const response = chrome.runtime.sendMessage({ event, payload }) as EventOutput<K>;
  handleSendMessageResponse(response, reply);
}

// Common handler for message responses
function handleSendMessageResponse<K extends keyof MyEvents>(
  response: EventOutput<K>,
  reply?: (response: EventHandlerOutput<K>) => void
): void {
  // @ts-expect-error depreciated?
  const lastError = chrome.runtime?.lastError;
  if (lastError) {
    reply?.({ error: `${lastError.message}` });
  } else if (response && (response as any).error) {
    reply?.({ error: (response as any).error });
  } else {
    reply?.(response);
  }
}

// Internal method to handle incoming messages and dispatch them to registered handlers
async function handleMessage(
  message: { event: keyof MyEvents; payload: unknown },
  sender: chrome.runtime.MessageSender
): Promise<unknown> {
  log(`Message Passed:`, message);
  const eventHandlers = handlers[message.event];
  if (eventHandlers) {
    try {
      const results = await Promise.all(
        eventHandlers.map((handler) => {
          // @ts-ignore
          return handler(message.payload, sender, message.event);
        })
      );
      return results.length === 1 ? results[0] : results; // Return the result of the handler(s)
    } catch (error) {
      console.error("Message handler error:", error);
      return { error: (error as Error).message };
    }
  } else {
    return undefined;
  }
}

export const messages = {
  init,
  on,
  emit,
  emitWorker,
};

export type EventInput<K extends keyof MyEvents> = MyEvents[`${K}`]["in"];
export type EventOutput<K extends keyof MyEvents> = MyEvents[`${K}`]["out"];

type EventTypes = keyof MyEvents;

type EventHandlerOutput<K extends EventTypes> = EventOutput<K> | Error | { error: string };

type EventHandler<K extends EventTypes> = (
  payload: EventInput<K>,
  sender: chrome.runtime.MessageSender,
  event: K
) => Promise<EventHandlerOutput<K>> | EventHandlerOutput<K>;

type Handlers<E extends EventTypes> = {
  [K in E]?: EventHandler<K>[];
};
