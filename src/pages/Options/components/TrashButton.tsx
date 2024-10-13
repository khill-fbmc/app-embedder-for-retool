import React from "react";
import { Button } from "react-bootstrap";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function TrashButton({ onClick }: Props) {
  const handler = onClick ?? function () {};
  return (
    <Button variant="danger" onClick={handler}>
      <i className="bi bi-trash"></i>
    </Button>
  );
}

export default TrashButton;
