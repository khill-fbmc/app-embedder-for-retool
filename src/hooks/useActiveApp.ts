import { useStore } from "./useStore";

export function useActiveApp() {
  const getActiveApp = useStore((s) => s.getActiveApp);
  const updateActiveApp = useStore((s) => s.updateActiveApp);
  const app = getActiveApp();
  return [app, updateActiveApp] as const;
}
