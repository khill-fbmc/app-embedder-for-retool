import "./Panel.css";

import React from "react";

import { useActiveAppUrl } from "@/hooks/useActiveAppUrl";
import { useExtensionState } from "@/hooks/useExtensionState";

import UnsetSettingError from "./UnsetSettingError";

function Panel() {
  const domain = useExtensionState((s) => s.domain);
  const activeAppName = useExtensionState((s) => s.activeAppName);

  const url = useActiveAppUrl();

  return domain === "" ? (
    <UnsetSettingError unsetSetting="Instance Name" />
  ) : activeAppName === "" ? (
    <UnsetSettingError unsetSetting="App Name" />
  ) : (
    <iframe
      id="retool-frame"
      className="full-height"
      title={"Retool Embedder"}
      src={url}
      width="100%"
      height="100%"
    />
  );
}

export default Panel;
