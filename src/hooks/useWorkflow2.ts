import useSWR from "swr";

import type { RetoolApp } from "@/types/extension";

export function useWorkflow(url: string, apiKey: string) {
  return useSWR<{ apps: RetoolApp[] }>(url, async () => {
    if (!url) {
      return { apps: [] };
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Workflow-Api-Key": apiKey,
      },
    });

    const data = (await res.json()) as { apps: RetoolApp[] };

    if (!data?.apps) {
      throw new Error(
        "The returned object from the workflow must have `apps` as a property."
      );
    }

    return { apps: data.apps };
  });
}
