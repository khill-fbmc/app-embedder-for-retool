import React from "react";
import { Col, Row } from "react-bootstrap";

import { useRetoolAppUrl } from "@/hooks/useRetoolAppUrl";

import ParameterList from "./ParameterList";

import type { RetoolApp } from "@/types/extension";

type ParameterListParams = React.ComponentProps<typeof ParameterList>["params"];

function RetoolAppUrl2({ app, domain }: { app: RetoolApp; domain: string }) {
  const fullUrl = useRetoolAppUrl(domain, app);
  const url = new URL(fullUrl);

  const queryParams = Array.from(url.searchParams.entries());

  const hashParams: ParameterListParams = app.hash.map((p) => {
    return [p.param, p.value];
  });

  console.log(hashParams);

  return (
    <div className="mb-4">
      <h4>Composed URL</h4>
      <a
        href={fullUrl}
        target="_blank"
        rel="noreferrer"
        title={`Open App in Retool (${app.name})`}
      >
        <p className="lead">{url.origin + url.pathname}</p>
      </a>
      <Row>
        <Col>
          <h5>Query Params:</h5>
          <ul className="parameter-list">
            <ParameterList type="query" params={queryParams} />
          </ul>
        </Col>
        <Col>
          <h5>Hash Params:</h5>
          <ul className="parameter-list">
            {hashParams.length > 0 && (
              <ParameterList type="hash" params={hashParams} />
            )}
          </ul>
        </Col>
      </Row>
    </div>
  );
}

export default RetoolAppUrl2;
