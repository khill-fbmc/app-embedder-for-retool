import JsonView from "@uiw/react-json-view";
import { githubLightTheme } from "@uiw/react-json-view/githubLight";
import React from "react";

type Props = {
  value: object | undefined;
};

export function SimpleJsonView({ value }: Props) {
  return (
    <JsonView
      value={value}
      collapsed={3}
      displayDataTypes={false}
      enableClipboard={false}
      style={githubLightTheme}
      shortenTextAfterLength={0}
    />
  );
}
