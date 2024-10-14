import { useExtensionState } from "./useExtensionState";

export function useActiveApp() {
  const apps = useExtensionState((s) => s.apps);
  const activeAppName = useExtensionState((s) => s.activeAppName);

  return apps.find((app) => app.name === activeAppName);
}
