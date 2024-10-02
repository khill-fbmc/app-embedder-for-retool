import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { useExtensionState } from "../../../../hooks/useExtensionState";

export default function DomainInputGroup() {
  const domain = useExtensionState((state) => state.domain);
  const setDomain = useExtensionState((state) => state.setDomain);

  return (
    <Form.Group
      className="mb-4"
      controlId="domain"
    >
      <Form.Label>
        Instance Name{"  "}
        <span className="d-inline ml-2 text-danger">(required)</span>
      </Form.Label>

      <InputGroup>
        <InputGroup.Text className="primary">https://</InputGroup.Text>
        <Form.Control
          value={domain}
          onChange={(e) => setDomain(e.target.value.replace(/\s/, ""))}
        />
        <InputGroup.Text>.retool.com</InputGroup.Text>
      </InputGroup>
      <Form.Text className="text-muted">This is your registered domain / instance name.</Form.Text>
    </Form.Group>
  );
}
