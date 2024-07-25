import "./Panel.css";

import React from "react";

import RetoolFrame from "./RetoolFrame";
import UnsetSettingError from "./UnsetSettingError";

import type { ExtensionSettings } from "../../types";

interface Props {
  settings: Required<Omit<ExtensionSettings, "workflowUrl" | "workflowApiKey">>;
}

const Panel: React.FC<Props> = ({ settings }) => {
  return settings.domain === "" ? (
    <UnsetSettingError unsetSetting="Instance Name" />
  ) : settings.app === "" ? (
    <UnsetSettingError unsetSetting="App Name" />
  ) : (
    <RetoolFrame {...settings} />
  );
};

export default Panel;
