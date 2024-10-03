import React from "react";
import { Form, InputGroup } from "react-bootstrap";

import { useDomain } from "@/hooks/useDomain";

export default function DomainInputGroup() {
  const { domain, setDomain } = useDomain();

  return (
    <Form.Group className="mb-4" controlId="domain">
      <Form.Label>
        Instance Name{"  "}
        <span className="d-inline ml-2 text-danger">(required)</span>
      </Form.Label>

      <InputGroup>
        <InputGroup.Text className="bg-secondary-subtle">
          https://
        </InputGroup.Text>
        <Form.Control
          value={domain}
          onChange={(e) => setDomain(e.target.value.replace(/\s/, ""))}
        />
        <InputGroup.Text className="bg-secondary-subtle">
          .retool.com
        </InputGroup.Text>
      </InputGroup>
      <Form.Text className="text-muted">
        This is your registered domain / instance name.
      </Form.Text>
    </Form.Group>
  );
}
