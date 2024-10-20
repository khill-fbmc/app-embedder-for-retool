import { useStore } from "./useStore";

export function useTabs() {
  const currentTab = useStore((s) => s.currentTab);
  const setCurrentTab = useStore((s) => s.setActiveTab);
  return [currentTab, setCurrentTab] as const;
}
