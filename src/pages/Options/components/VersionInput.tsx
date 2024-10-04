import React, { useEffect, useMemo, useState } from "react";
import Form from "react-bootstrap/Form";

import type { AppVersion } from "@/types/extension";

type Props = {
  value: AppVersion;
  onChange: (version: AppVersion) => void;
};

export default function VersionInput({ value, onChange }: Props) {
  return (
    <Form.Group className="mb-4" controlId="version">
      <Form.Label>Version</Form.Label>
      <Form.Control
        value={value}
        onChange={(e) => {
          const value = e.target.value as AppVersion;
          let version: AppVersion = "latest";
          if (/(?:[0-9]+\.){2}[0-9]+/.test(value)) {
            version = value;
          }
          onChange(version);
        }}
      />
      <Form.Text className="text-muted">
        Input version: "1.2.3" or "latest"
      </Form.Text>
    </Form.Group>
  );
}
