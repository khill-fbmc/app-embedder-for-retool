import React from "react";
import Form from "react-bootstrap/Form";

import { useActiveApp } from "@/hooks/useActiveApp";

import type { AppEnvironment } from "@/types/extension";

type Props = {
  environment: AppEnvironment;
  onChange: (env: Props["environment"]) => void;
};

const EnvironmentRadio: React.FC<Props> = ({ environment, onChange }) => {
  const { app, updateApp } = useActiveApp();

  return ["production", "staging", "development"].map((env) => (
    <Form.Check
      key={env}
      checked={env === environment}
      label={env.charAt(0).toUpperCase() + env.slice(1)}
      name="environment"
      onChange={(e) => onChange(e.target.value as Props["environment"])}
      type="radio"
      value={env}
    />
  ));
};

export default EnvironmentRadio;
