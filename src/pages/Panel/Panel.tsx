import "./Panel.css";

import React from "react";

import RetoolFrame from "./RetoolFrame";

const Panel: React.FC = () => {
  return (
    <div className="container">
      <RetoolFrame
        title="RetoolEmbedder"
        domain={"fortunabmc"}
        app={"embedded-purchase-orders"}
        env="development"
      />
    </div>
  );
};

export default Panel;
