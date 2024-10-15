import { useStore } from "./useStore";

export function useActiveApp() {
  const apps = useStore((s) => s.apps);
  const activeAppName = useStore((s) => s.activeAppName);

  return apps.find((app) => app.name === activeAppName);
}
