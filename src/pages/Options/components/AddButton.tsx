import React from "react";
import { Button } from "react-bootstrap";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function AddButton({ onClick }: Props) {
  const handler = onClick ?? function () {};
  return (
    <Button className="btn-sm mx-5" variant="primary" onClick={handler}>
      Add +
    </Button>
  );
}

export default AddButton;
