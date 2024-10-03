import clsx from "clsx";
import React from "react";
import Form from "react-bootstrap/Form";

import type { AppEnvironment } from "@/types/extension";

type Props = {
  env?: AppEnvironment;
  onChange: (env: AppEnvironment) => void;
};

export default function EnvironmentSelect({ env, onChange }: Props) {
  const handleChange = onChange ?? function () {};

  return (
    <Form.Group className="mb-4" controlId="env">
      <Form.Label className="d-flex align-items-center">
        <div className={clsx("dot", env && `bg-${env}`)}>&nbsp;</div>
        Environment
      </Form.Label>
      <Form.Select
        value={env}
        onChange={(e) => handleChange(e.target.value as AppEnvironment)}
      >
        <option value="production">Production</option>
        <option value="staging">Staging</option>
        <option value="development">Development</option>
      </Form.Select>

      <Form.Text className="text-muted">Select preferred environment</Form.Text>
    </Form.Group>
  );
}
