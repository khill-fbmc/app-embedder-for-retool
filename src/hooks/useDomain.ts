import { useExtensionState } from "./useExtensionState";

export function useDomain() {
  const domain = useExtensionState((state) => state.domain);
  const setDomain = useExtensionState((state) => state.setDomain);
  return { domain, setDomain };
}
