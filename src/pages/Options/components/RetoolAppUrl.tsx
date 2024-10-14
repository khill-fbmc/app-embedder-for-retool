import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

import { useRetoolUrl } from "@/hooks/useRetoolUrl";

import type { RetoolApp } from "@/types/extension";

function RetoolAppUrl({ app, domain }: { app: RetoolApp; domain: string }) {
  const url = useRetoolUrl(domain, app);

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

export default RetoolAppUrl;
