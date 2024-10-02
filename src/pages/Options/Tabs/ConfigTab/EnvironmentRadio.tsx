import React from "react";
import Form from "react-bootstrap/Form";

import type { AppEnvironment } from "../../../../types";

type Props = {
  environment: AppEnvironment;
  onChange: (env: Props["environment"]) => void;
};

const EnvironmentRadio: React.FC<Props> = ({ environment, onChange }) => {
  return ["production", "staging", "development"].map((env) => (
    <Form.Check
      checked={env === environment}
      key={env}
      type="radio"
      name="environment"
      label={env.charAt(0).toUpperCase() + env.slice(1)}
      value={env}
      onChange={(e) => onChange(e.target.value as Props["environment"])}
    />
  ));
};

export default EnvironmentRadio;
