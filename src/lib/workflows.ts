export const callWorkflow = async (url: string, workflowApiKey: string): Promise<string[]> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Workflow-Api-Key": workflowApiKey,
    },
  });
  const data = (await res.json()) as { apps: string[] };
  return data.apps ?? [];
};
