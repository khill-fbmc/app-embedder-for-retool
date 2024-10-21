import { useStore } from "@/hooks/useStore";

import type { State } from "@/hooks/useStore";

export function useStorePrimitives() {
  const _state = useStore();
  let state: Partial<State> = {};

  for (const [k, v] of Object.entries(_state)) {
    const key = k as keyof State;
    if (typeof _state[key] !== "function") {
      state = { ...state, [key]: v };
    }
  }

  return state;
}
