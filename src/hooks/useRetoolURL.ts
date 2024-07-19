import { useMemo, useState } from "react";

import { retoolUrl } from "../lib/RetoolURL";

import type { Environment, RetoolUrlConfig, RetoolVersion } from "../lib/RetoolURL";

export function useRetoolURL(initConfig: RetoolUrlHookConfig = {}) {
  const [domain, setDomain] = useState<string>(() => getInitialState(initConfig, "domain", ""));
  const [app, setApp] = useState<string>(() => getInitialState(initConfig, "app", ""));
  const [version, setVersion] = useState<RetoolVersion>(() =>
    getInitialState(initConfig, "version", "latest")
  );
  const [environment, setEnvironment] = useState<Environment>(() =>
    getInitialState(initConfig, "env", "production")
  );

  const builder = useMemo(() => {
    return retoolUrl({
      app,
      version,
      domain,
      env: environment,
    });
  }, [domain, app, version, environment]);

  const url = useMemo(() => builder.toString(), [builder]);

  return { url, builder, setApp, setDomain, setVersion, setEnvironment } as const;
}

function getInitialState<T>(
  initConfig: RetoolUrlHookConfig,
  key: keyof RetoolUrlHookConfig,
  defaultValue: T
): T {
  return initConfig ? ((initConfig[key] as T) ?? defaultValue) : defaultValue;
}

export type RetoolUrlHookConfig = Partial<
  Omit<RetoolUrlConfig, "embed" | "hideNav" | "hideTimer" | "historyOffset">
>;
