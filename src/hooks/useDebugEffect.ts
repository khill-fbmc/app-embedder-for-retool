import { useEffect } from "react";

import { debug } from "@/lib/logger";

export function useDebugEffect(tag: string, arg: unknown) {
  useEffect(() => debug(`🔖 ${tag}\n`, arg), [tag, arg]);
}
