import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

import { debug } from "@/lib/logger";
import { errorToast, successToast } from "@/lib/toast";

import ActiveAppUrl from "../components/ActiveAppUrl";

import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import type { RetoolApp, UrlParamSpec } from "@/types/extension";

function AppForm({ app }: { app: RetoolApp }) {
  const { control, formState, handleSubmit } = useForm<RetoolApp>({
    mode: "all",
    defaultValues: { ...app },
  });

  const onSubmit: SubmitHandler<RetoolApp> = async (data) => {
    if (!formState.isValid) {
      console.log(formState);
      errorToast(JSON.stringify(formState.errors));
    } else {
      debug("SUBMIT", data);
      successToast("Edits saved.");
    }
  };

  const onError: SubmitErrorHandler<RetoolApp> = (errors, e) => {
    console.log(errors, e);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Form.Group className="mb-4" controlId="app">
        <Form.Label>
          App Name{"  "}
          <span className="d-inline ml-2 text-danger">(required)</span>
        </Form.Label>
        <Controller
          name="name"
          control={control}
          defaultValue={app?.name}
          render={({ field }) => <Form.Control {...field} />}
        />
        <Form.Text className="text-muted">
          Use the "Share" button in the editor and copy the name / id from the
          URL after "app/"
        </Form.Text>
      </Form.Group>
      <Row>
        <Col sm={6} xs={12}>
          <Form.Group className="mb-4" controlId="version">
            <Form.Label>Version</Form.Label>
            <Controller
              name="version"
              control={control}
              defaultValue={app?.version}
              render={({ field, fieldState }) => (
                <>
                  <Form.Control {...field} />
                  {fieldState.invalid && <p>Not Valid</p>}
                </>
              )}
              rules={{
                pattern: {
                  value: /\d+\.\d+\.\d+|latest/,
                  message:
                    "Must be 'latest' or follow 'n.n.n' where n is any number",
                },
              }}
            />
            <Form.Text className="text-muted">
              Input version: "1.2.3" or "latest"
            </Form.Text>
          </Form.Group>
        </Col>
        <Col sm={6} xs={12}>
          <Form.Group className="mb-4" controlId="env">
            <Controller
              name="env"
              control={control}
              defaultValue={app?.env}
              render={({ field }) => (
                <>
                  <Form.Label className="d-flex align-items-center">
                    <div className={clsx("dot", `bg-${field.value}`)}>
                      &nbsp;
                    </div>
                    Environment
                  </Form.Label>
                  <Form.Select {...field}>
                    <option value="production">Production</option>
                    <option value="staging">Staging</option>
                    <option value="development">Development</option>
                  </Form.Select>
                </>
              )}
            />

            <Form.Text className="text-muted">
              Select preferred environment
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group
            className="d-flex flex-column mb-4 gap-1"
            controlId="query"
          >
            <Form.Label>Extra URL Params</Form.Label>
            {app?.query && <ParamMiniForm params={app.query} />}
          </Form.Group>
        </Col>

        <Col>
          <Form.Group
            className="d-flex flex-column mb-4 gap-1"
            controlId="hash"
          >
            <Form.Label>Hash Params</Form.Label>
            {app?.hash && <ParamMiniForm params={app.hash} />}
          </Form.Group>
        </Col>
      </Row>

      <ActiveAppUrl />
    </Form>
  );
}

export default AppForm;

const ParamMiniForm: React.FC<{ params: UrlParamSpec[] }> = ({ params }) => {
  return (
    <>
      {params.map((spec) => {
        const key = `URL_${spec.index}`;
        return (
          <ParamInputGroup
            key={key}
            spec={spec}
            onChange={(spec) => {
              debug(`[QUERY|SET]`, {
                key,
                spec,
              });
            }}
            onRemove={(indexToRemove) => {
              debug("[QUERY|DEL]", { key, indexToRemove });
            }}
          />
        );
      })}
      <Button
        className="btn-sm mx-5"
        variant="primary"
        onClick={(e) => {
          debug("[QUERY|ADD]");
        }}
      >
        Add +
      </Button>
    </>
  );
};

const ParamInputGroup: React.FC<{
  spec: UrlParamSpec;
  onRemove: (index: number) => void;
  onChange: (data: UrlParamSpec) => void;
}> = ({ spec, onChange, onRemove }) => {
  const [_key, set_key] = useState(spec.param);
  const [_value, set_value] = useState(spec.value);

  useEffect(() => {
    onChange({
      index: spec.index,
      param: _key,
      value: _value,
    });
  }, [_key, _value, spec, onChange]);

  return (
    <InputGroup>
      <Form.Control
        placeholder="key"
        value={_key}
        onChange={(e) => set_key(e.target.value)}
      />
      <Form.Control
        placeholder="value"
        value={_value}
        onChange={(e) => set_value(e.target.value)}
      />
      <Button onClick={() => onRemove(spec.index)} variant="danger">
        <i className="bi bi-trash"></i>
      </Button>
    </InputGroup>
  );
};
