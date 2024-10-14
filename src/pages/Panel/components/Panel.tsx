import "./Panel.css";

import React from "react";

import { useActiveApp } from "@/hooks/useActiveApp";
import { useActiveAppUrl } from "@/hooks/useActiveAppUrl";
import { useDomain } from "@/hooks/useDomain";

import UnsetSettingError from "./UnsetSettingError";

function Panel() {
  const { domain } = useDomain();
  const { app } = useActiveApp();

  const url = useActiveAppUrl();

  return domain === "" ? (
    <UnsetSettingError unsetSetting="Instance Name" />
  ) : app?.name === "" ? (
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
