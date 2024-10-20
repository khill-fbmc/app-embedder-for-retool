import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import ChromeStateStorage from "@/lib/ChromeStateStorage";
import { DEMO_APPS, INSPECTOR_APP } from "@/lib/EmbeddableApps";

import type { RetoolApp } from "@/types/extension";

type TabKeys = "config" | "storage" | "workflow" | "json";

export type State = {
  currentTab: TabKeys;
  domain: string;
  isEditing: boolean;
  activeAppName: RetoolApp["name"] | undefined;
  // activeApp: RetoolApp | undefined;
  workflow: {
    id: string;
    apiKey: string;
  };
  apps: RetoolApp[];
};

export type Actions = {
  reset: () => void;
  addApp: (app: RetoolApp) => void;
  removeApp: (name: RetoolApp["name"]) => void;
  updateApp: (name: RetoolApp["name"], props: Partial<RetoolApp>) => void;
  updateActiveApp: (props: Partial<RetoolApp>) => void;
  setDomain: (domain: State["domain"]) => void;
  getActiveApp: () => RetoolApp | undefined;
  setActiveApp: (activeAppName: State["activeAppName"]) => void;
  setEditMode: (state: boolean) => void;
  setActiveTab: (tab: TabKeys) => void;
  updateWorkflow: (workflow: Partial<State["workflow"]>) => void;
};

export const STORAGE_KEY = "app-embedder-for-retool4";

const initialState: State = {
  domain: "fortunabmc",
  currentTab: "config",
  isEditing: false,
  activeAppName: INSPECTOR_APP["name"],
  workflow: {
    id: "13d34554-9891-40c0-a032-fda523774e97",
    apiKey: "retool_wk_bde9d74b27644cf3a0691211ff18dee2",
  },
  apps: [INSPECTOR_APP, ...DEMO_APPS],
};

export const useStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      reset: () => set(initialState),
      setActiveTab: (tab) => set({ currentTab: tab }),
      setDomain: (domain) => set(() => ({ domain })),
      setEditMode: (isEditing) => set(() => ({ isEditing })),
      addApp: (app) => set((state) => ({ apps: [...state.apps, app] })),
      removeApp: (name) => {
        set((state) => ({
          apps: state.apps.filter((app) => app.name !== name),
        }));
      },
      updateApp: (name, props) => {
        set((state) => ({
          apps: state.apps.map((app) => {
            return app.name === name ? { ...app, ...props } : app;
          }),
        }));
      },
      getActiveApp: () => {
        const activeAppName = get().activeAppName;
        return get().apps.find((app) => app.name === activeAppName);
      },
      setActiveApp: (name) => {
        set(() => ({ activeAppName: name }));
      },
      updateActiveApp: (props) => {
        const name = get().activeAppName;
        if (name) {
          get().updateApp(name, props);
        }
      },
      updateWorkflow: (props) => {
        set((state) => ({
          ...state,
          workflow: { ...state.workflow, ...props },
        }));
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => ChromeStateStorage),
    }
  )
);
