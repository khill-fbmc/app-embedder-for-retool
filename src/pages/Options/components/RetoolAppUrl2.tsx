import JsonView from "@uiw/react-json-view";
import { githubLightTheme } from "@uiw/react-json-view/githubLight";
import React, { useMemo } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

import { useRetoolAppUrl } from "@/hooks/useRetoolAppUrl";

import type { RetoolApp } from "@/types/extension";

function RetoolAppUrl2({ app, domain }: { app: RetoolApp; domain: string }) {
  const url = useRetoolAppUrl(domain, app);
  const jsonUrl = useMemo(() => new URL(url), [url]);

  return (
    <div className="mb-4">
      <h3>Composed URL 2</h3>
      <JsonView
        value={jsonUrl}
        collapsed={3}
        displayDataTypes={false}
        enableClipboard={false}
        style={githubLightTheme}
        shortenTextAfterLength={0}
      />
    </div>
  );
}

export default RetoolAppUrl2;
