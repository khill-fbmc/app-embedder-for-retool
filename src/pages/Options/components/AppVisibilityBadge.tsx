import "./AppCard.css";

import React from "react";
import { Badge } from "react-bootstrap";

type Props = {
  isPublic?: boolean;
};

function AppVisibilityBadge({ isPublic }: Props) {
  return (
    <Badge pill bg="secondary">
      {isPublic ? (
        <span className="d-inline-flex gap-1">
          <i className="bi bi-share-fill"></i>
          public
        </span>
      ) : (
        <span className="d-inline-flex gap-1">
          <i className="bi bi-shield-shaded"></i>
          private
        </span>
      )}
    </Badge>
  );
}

export default AppVisibilityBadge;
