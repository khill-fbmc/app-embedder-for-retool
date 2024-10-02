import { useExtensionState } from "./useExtensionState";

export function useComposedUrl() {
  return useExtensionState((state) => {
    const app = state.getActiveApp();

    if (app) {
      const url = new URL(
        `${app.public ? "p" : "app"}/${app.name}}`,
        `https://${state.domain}.retool.com/`
      );
      app.query.forEach((q) => url.searchParams.append(q.param, q.value));

      if (app.hash.length === 0) {
        return `${url.toString()}`;
      }

      const hashParams = new URLSearchParams(app.hash.map((h) => [h.param, h.value]));
      return `${url.toString()}#${hashParams.toString()}`;
    }
  });
}
