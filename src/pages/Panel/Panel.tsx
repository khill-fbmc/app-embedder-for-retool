import "./Panel.css";

import React, { useMemo, useState } from "react";

import { useRetoolUrl } from "../../hooks/useRetoolUrl";
import { storage } from "../../lib/storage";
import UnsetSettingError from "./UnsetSettingError";

import type { SerializedSettings } from "../../lib/storage";
import type { ParamEntry } from "../../types";

interface Props {
  settings: Required<Omit<SerializedSettings, "workflowUrl" | "workflowApiKey">>;
}

const Panel: React.FC<Props> = ({ settings }) => {
  const [urlParams, setUrlParams] = useState<ParamEntry[]>(settings.urlParams);
  const [hashParams, setHashParams] = useState<ParamEntry[]>(settings.hashParams);

  const { url, setApp, setEnv, setDomain, setVersion } = useRetoolUrl(settings);

  storage.onUpdate((settings) => {
    settings?.env && setEnv(settings.env);
    settings?.app && setApp(settings.app);
    settings?.domain && setDomain(settings.domain);
    settings?.version && setVersion(settings.version);
    settings?.hashParams && setHashParams(settings.hashParams);
    settings?.urlParams && setHashParams(settings.urlParams);
  });

  const composedUrl = useMemo(() => {
    const _url = new URL(url);
    const _hashParams = new URLSearchParams();
    urlParams.forEach(({ param, value }) => _url.searchParams.append(param, value));
    hashParams.forEach(({ param, value }) => _hashParams.append(param, value));
    if (hashParams.length === 0) {
      return `${_url.toString()}`;
    }
    return `${_url.toString()}#${_hashParams.toString()}`;
  }, [url, urlParams, hashParams]);

  return settings.domain === "" ? (
    <UnsetSettingError unsetSetting="Instance Name" />
  ) : settings.app === "" ? (
    <UnsetSettingError unsetSetting="App Name" />
  ) : (
    <iframe
      id="retool-frame"
      className="full-height"
      title={"Retool Embedder"}
      src={composedUrl}
      width="100%"
      height="100%"
    />
  );
};

export default Panel;
