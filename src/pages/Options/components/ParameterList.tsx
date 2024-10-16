import "./ParameterList.css";

import React from "react";

type Props = {
  type: "query" | "hash";
  params: [param: string, value: string][];
};

function ParameterList({ params, type }: Props) {
  return (
    <ul className="parameter-list">
      {params.map(([param, value]) => (
        <li key={param} className={`${type}-param`}>
          <span className="param-name">{param}</span>
          <span className="param-value">{value}</span>
        </li>
      ))}
    </ul>
  );
}

export default ParameterList;
