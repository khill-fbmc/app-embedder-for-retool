import React from "react";
import Form from "react-bootstrap/Form";

import { useActiveApp } from "@/hooks/useActiveApp";

import type { AppVersion } from "@/types";

export default function VersionInput() {
  const { app, updateApp } = useActiveApp();

  return (
    <Form.Group className="mb-4" controlId="version">
      <Form.Label>Version</Form.Label>
      <Form.Control
        value={app?.version}
        onChange={(e) => {
          const value = e.target.value as AppVersion;
          if (/(?:[0-9]+\.){2}[0-9]+/.test(value)) {
            updateApp({ version: value });
          } else {
            updateApp({ version: "latest" });
          }
        }}
      />
      <Form.Text className="text-muted">
        Input version: "1.2.3" or "latest"
      </Form.Text>
    </Form.Group>
  );
}
