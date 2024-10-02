import React from "react";
import Form from "react-bootstrap/Form";

type Props = {
  name: string;
  onChange: (name: string) => void;
};

export default function AppNameInput({ name, onChange }: Props) {
  return (
    <Form.Group
      className="mb-4"
      controlId="app"
    >
      <Form.Label>
        App Name{"  "}
        <span className="d-inline ml-2 text-danger">(required)</span>
      </Form.Label>
      <Form.Control
        value={name}
        onChange={(e) => onChange(e.target.value)}
      />
      <Form.Text className="text-muted">
        Use the "Share" button in the editor and copy the name / id from the URL after "app/"
      </Form.Text>
    </Form.Group>
  );
}
