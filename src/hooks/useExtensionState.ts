import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import ChromeStateStorage from "../lib/chrome/ChromeStateStorage";
import { DEMO_APPS, INSPECTOR_APP } from "../pages/Options/EmbeddableApps";

import type { RetoolApp } from "../types";

type State = {
  domain: string;
  apps: RetoolApp[];
  activeAppName: RetoolApp["name"] | undefined;
  // activeApp: RetoolApp | undefined;
  workflowUrl: string;
  workflowApiKey: string;
};

interface Actions {
  reset: () => void;
  getActiveApp: () => RetoolApp | undefined;
  setDomain: (domain: State["domain"]) => void;
  setActiveApp: (name: State["domain"]) => void;
  addApp: (app: RetoolApp) => void;
  updateApp: (name: string, app: Partial<RetoolApp>) => void;
}

export const STORAGE_KEY = "app-embedder-for-retool";

const initialState: State = {
  domain: "",
  activeAppName: INSPECTOR_APP["name"],
  workflowUrl: "",
  workflowApiKey: "",
  apps: [INSPECTOR_APP, ...DEMO_APPS],
};

export const useExtensionState = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      reset: () => set(initialState),
      setDomain: (domain) => set(() => ({ domain })),
      setActiveApp: (name) => set(() => ({ activeAppName: name })),
      addApp: (app) => set((state) => ({ apps: [...state.apps, app] })),
      updateApp: (name, props) => {
        set((state) => ({
          apps: state.apps.map((app) => (app.name === name ? { ...app, ...props } : app)),
        }));
      },
      getActiveApp: () => get().apps.find((app) => app.name === get().activeAppName),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => ChromeStateStorage),
    }
  )
);
