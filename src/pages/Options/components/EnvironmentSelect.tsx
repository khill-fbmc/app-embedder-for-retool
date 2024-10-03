import clsx from "clsx";
import React from "react";
import Form from "react-bootstrap/Form";

import { useActiveApp } from "@/hooks/useActiveApp";

import type { AppEnvironment } from "@/types";

export default function EnvironmentSelect() {
  const { app, updateApp } = useActiveApp();

  return (
    <Form.Group className="mb-4" controlId="env">
      <Form.Label className="d-flex align-items-center">
        <div className={clsx("dot", app?.env && `bg-${app?.env}`)}>&nbsp;</div>
        Environment
      </Form.Label>
      <Form.Select
        value={app?.env}
        onChange={(e) => {
          updateApp({
            env: e.target.value as AppEnvironment,
          });
        }}
      >
        <option value="production">Production</option>
        <option value="staging">Staging</option>
        <option value="development">Development</option>
      </Form.Select>

      <Form.Text className="text-muted">Select preferred environment</Form.Text>
    </Form.Group>
  );
}
