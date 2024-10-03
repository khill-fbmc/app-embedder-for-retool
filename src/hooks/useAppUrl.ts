import { useExtensionState } from "./useExtensionState";

import type { RetoolApp } from "../types";

export function useAppUrl(app: RetoolApp) {
  const domain = useExtensionState((s) => s.domain);

  const base = `https://${domain}.retool.com/`;
  const path = `${app.public ? "p" : "app"}/${app.name}`;
  const url = new URL(path, base);

  app.query.forEach((q) => url.searchParams.append(q.param, q.value));

  if (app.hash.length === 0) {
    return `${url.toString()}`;
  }

  const hashParams = new URLSearchParams(
    app.hash.map((h) => [h.param, h.value])
  );

  return `${url.toString()}#${hashParams.toString()}`;
}