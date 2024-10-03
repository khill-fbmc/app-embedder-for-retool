import React from "react";
import Form from "react-bootstrap/Form";

import type { AppVersion } from "@/types/extension";

type Props = {
  version: AppVersion | undefined;
  onChange?: (version: AppVersion) => void;
};

export default function VersionInput({ version, onChange }: Props) {
  const handleChange = onChange ?? function () {};

  return (
    <Form.Group className="mb-4" controlId="version">
      <Form.Label>Version</Form.Label>
      <Form.Control
        value={version}
        onChange={(e) => {
          const value = e.target.value as AppVersion;
          let version: AppVersion = "latest";
          if (/(?:[0-9]+\.){2}[0-9]+/.test(value)) {
            version = value;
          }
          handleChange(version);
        }}
      />
      <Form.Text className="text-muted">
        Input version: "1.2.3" or "latest"
      </Form.Text>
    </Form.Group>
  );
}
