import "./ParameterList.css";

import React from "react";

import type { UrlParam } from "@/types/extension";

type Props = {
  type: "query" | "hash";
  params: UrlParam[] | [param: string, value: string][];
};

function ParameterList({ params, type }: Props) {
  const parameters: [string, string][] = params.map((param) =>
    Array.isArray(param) ? param : [param.param, param.value]
  );

  return (
    <ul className="parameter-list">
      {parameters.map(([param, value]) => (
        <li key={param} className={`${type}-param`}>
          <span className="param-name">{param}</span>
          <span className="param-value">{value}</span>
        </li>
      ))}
    </ul>
  );
}

export default ParameterList;
