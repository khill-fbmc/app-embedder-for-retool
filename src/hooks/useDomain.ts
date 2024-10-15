import { useStore } from "./useStore";

export function useDomain() {
  const domain = useStore((s) => s.domain);
  const setDomain = useStore((s) => s.setDomain);
  return { domain, setDomain };
}
