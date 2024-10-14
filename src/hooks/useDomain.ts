import { useExtensionState } from "./useExtensionState";

export function useDomain() {
  const domain = useExtensionState((s) => s.domain);
  const setDomain = useExtensionState((s) => s.setDomain);
  return { domain, setDomain };
}
