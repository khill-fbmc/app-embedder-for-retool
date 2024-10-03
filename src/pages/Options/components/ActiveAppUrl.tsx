import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

import { useActiveAppUrl } from "@/hooks/useActiveAppUrl";

function ActiveAppUrl() {
  const url = useActiveAppUrl();

  return (
    <Form.Group className="mb-4" controlId="url">
      <Form.Label>Composed URL</Form.Label>
      <InputGroup>
        <Form.Control disabled readOnly value={url}></Form.Control>
        <Button
          variant="secondary"
          title={`Open Retool App in a new Tab`}
          onClick={() => window?.open(url, "_blank")}
        >
          <i className="bi bi-box-arrow-up-right"></i>
        </Button>
      </InputGroup>
      <Form.Text className="text-muted">Does this look correct?</Form.Text>
    </Form.Group>
  );
}

export default ActiveAppUrl;
