import React from "react";
import Form from "react-bootstrap/Form";

import type { AppVersion } from "../../../../types";

type Props = {
  version: AppVersion;
  onChange: (env: Props["version"]) => void;
};

export default function VersionInput({ version, onChange }: Props) {
  return (
    <Form.Group
      className="mb-4"
      controlId="version"
    >
      <Form.Label>Version</Form.Label>
      <Form.Control
        value={version}
        onChange={(e) => {
          const value = e.target.value as Props["version"];
          if (/(?:[0-9]+\.){2}[0-9]+/.test(value)) {
            onChange(value);
          } else {
            onChange("latest");
          }
        }}
      />
      <Form.Text className="text-muted">Input version: "1.2.3" or "latest"</Form.Text>
    </Form.Group>
  );
}
