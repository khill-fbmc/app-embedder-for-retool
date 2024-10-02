import React from "react";
import Form from "react-bootstrap/Form";

import type { AppEnvironment } from "../../../../types";

type Props = {
  environment: AppEnvironment;
  onChange: (env: Props["environment"]) => void;
};

export default function EnvironmentSelect({ environment, onChange }: Props) {
  return (
    <Form.Group
      className="mb-4"
      controlId="env"
    >
      <Form.Label>Environment</Form.Label>
      <Form.Select
        value={environment}
        onChange={(e) => onChange(e.target.value as Props["environment"])}
      >
        <option value="production">Production</option>
        <option value="staging">Staging</option>
        <option value="development">Development</option>
      </Form.Select>

      <Form.Text className="text-muted">Select preferred environment</Form.Text>
    </Form.Group>
  );
}
