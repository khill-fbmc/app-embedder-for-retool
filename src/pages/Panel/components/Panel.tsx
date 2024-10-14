import "./Panel.css";

import React from "react";

import { useActiveApp } from "@/hooks/useActiveApp";
import { useDomain } from "@/hooks/useDomain";
import { useRetoolUrl } from "@/hooks/useRetoolUrl";

import UnsetSettingError from "./UnsetSettingError";

function Panel() {
  const { domain } = useDomain();
  const app = useActiveApp();
  const appUrl = useRetoolUrl(domain);

  if (!domain || domain === "") {
    return <UnsetSettingError unsetSetting="Instance Name" />;
  }

  if (!app || app?.name === "") {
    return <UnsetSettingError unsetSetting="App Name" />;
  }

  return (
    <iframe
      id="retool-frame"
      className="full-height"
      title={"Retool Embedder"}
      src={appUrl(app)}
      width="100%"
      height="100%"
    />
  );
}

export default Panel;
