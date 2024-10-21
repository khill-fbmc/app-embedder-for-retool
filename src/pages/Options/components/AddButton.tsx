import React from "react";
import { Button } from "react-bootstrap";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function AddButton({ onClick }: Props) {
  return (
    <Button
      className="btn-sm mx-5"
      variant="primary"
      onClick={(e) => onClick && onClick(e)}
    >
      Add +
    </Button>
  );
}

export default AddButton;
