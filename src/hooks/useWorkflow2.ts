import useSWR from "swr";

import type { RetoolApp } from "@/types/extension";

export function useWorkflow(
  apiKey: string,
  url: string | undefined | null | false
) {
  const key = () => url;

  const fetcher = async (url: string) => {
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
  };

  return useSWR<{ apps: RetoolApp[] }>(key, fetcher);
}
