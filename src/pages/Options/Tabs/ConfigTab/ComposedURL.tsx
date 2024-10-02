import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

type Props = {
  title: string;
  url: string;
};

const ComposedURL: React.FC<Partial<Props>> = ({ url, title }) => {
  const properTitle = !title
    ? "Embedded App"
    : title
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

  return (
    <Form.Group
      className="mb-4"
      controlId="url"
    >
      <Form.Label>Composed URL</Form.Label>
      <InputGroup>
        <Form.Control
          disabled
          readOnly
          value={url}
        ></Form.Control>
        <Button
          variant="secondary"
          title={`Open ${properTitle} in a new Tab`}
          onClick={() => window?.open(url, "_blank")}
        >
          <i className="bi bi-box-arrow-up-right"></i>
        </Button>
      </InputGroup>
      <Form.Text className="text-muted">Does this look correct?</Form.Text>
    </Form.Group>
  );
};

export default ComposedURL;
