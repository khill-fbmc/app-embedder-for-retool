import clsx from "clsx";
import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { useAppList } from "@/hooks/useAppList";
import { useDomain } from "@/hooks/useDomain";
import { useEditMode } from "@/hooks/useEditMode";
import { useStore } from "@/hooks/useStore";
import { errorToast } from "@/lib/toast";

import AddButton from "./AddButton";
import RetoolAppUrl2 from "./RetoolAppUrl2";
import TrashButton from "./TrashButton";

import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import type { RetoolApp } from "@/types/extension";

type Props = {
  app: RetoolApp;
  onSave: SubmitHandler<RetoolApp>;
  onCancel: () => void;
};

const INIT_PARAM = { param: "", value: "" };

function AppForm({ app, onSave, onCancel }: Props) {
  const { domain } = useDomain();
  const { stopEditMode } = useEditMode();
  const { removeApp } = useAppList();
  const setActiveApp = useStore((s) => s.setActiveApp);

  const {
    control,
    formState: { errors },
    watch,
    reset: resetForm,
    handleSubmit,
  } = useForm<RetoolApp>({
    mode: "onBlur",
    defaultValues: { ...app },
  });

  // console.log(watch());

  const hashFields = useFieldArray({ name: "hash", control });
  const queryFields = useFieldArray({ name: "query", control });

  const onError: SubmitErrorHandler<RetoolApp> = (errors, e) => {
    const message = JSON.stringify(errors, null, 2);
    errorToast(message);
  };

  const onDelete = (name: string) => {
    if (window.confirm(`Please Confirm Removal of "${app.name}"`)) {
      stopEditMode();
      setActiveApp(undefined);
      resetForm();
      removeApp(name);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSave, onError)}>
      <Form.Group className="mb-4" controlId="app">
        <div className="d-flex justify-content-between">
          <Form.Label>
            App Name
            <span className="text-danger">{"   "}(required)</span>
          </Form.Label>
          <Controller
            name="public"
            control={control}
            defaultValue={app?.public}
            render={({ field }) => (
              <div className="d-flex gap-2">
                <Form.Label>Public</Form.Label>
                <Form.Check
                  name={field.name}
                  checked={field.value}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
        </div>

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
              render={({ field }) => (
                <>
                  <Form.Control {...field} />
                  {errors?.version && <p>Not Valid</p>}
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
            controlId="query"
            className="d-flex flex-column mb-4 gap-1"
          >
            <Form.Label>Extra URL Params</Form.Label>
            {queryFields.fields.map((field, index) => (
              <InputGroup key={field.id}>
                <Controller
                  name={`query.${index}.param` as const}
                  defaultValue={field.param}
                  control={control}
                  render={({ field }) => (
                    <Form.Control placeholder="param" {...field} />
                  )}
                />
                <Controller
                  name={`query.${index}.value` as const}
                  defaultValue={field.value}
                  control={control}
                  render={({ field }) => (
                    <Form.Control placeholder="value" {...field} />
                  )}
                />
                <TrashButton onClick={() => queryFields.remove(index)} />
              </InputGroup>
            ))}
            <AddButton onClick={() => queryFields.append(INIT_PARAM)} />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group
            controlId="hash"
            className="d-flex flex-column mb-4 gap-1"
          >
            <Form.Label>Hash Params</Form.Label>
            {hashFields.fields.map((field, index) => (
              <InputGroup key={field.id}>
                <Controller
                  name={`hash.${index}.param` as const}
                  defaultValue={field.param}
                  control={control}
                  render={({ field }) => (
                    <Form.Control placeholder="param" {...field} />
                  )}
                />
                <Controller
                  name={`hash.${index}.value` as const}
                  defaultValue={field.value}
                  control={control}
                  render={({ field }) => (
                    <Form.Control placeholder="value" {...field} />
                  )}
                />
                <TrashButton onClick={() => hashFields.remove(index)} />
              </InputGroup>
            ))}
            <AddButton onClick={() => hashFields.append(INIT_PARAM)} />
          </Form.Group>
        </Col>
      </Row>
      {/*
      <Row>
        <RetoolAppUrl domain={domain} app={watch()} />
      </Row> */}

      <Row>
        <RetoolAppUrl2 domain={domain} app={watch()} />
      </Row>

      <div className="d-flex gap-5">
        <Button
          className="d-flex gap-2 px-3"
          variant="outline-danger"
          onClick={onCancel}
        >
          <i className="bi bi-x-octagon"></i>Cancel
        </Button>
        <Button className="flex-fill px-5" type="submit" variant="success">
          Save
        </Button>
        <Button
          className="d-flex gap-2 px-3"
          variant="outline-danger"
          onClick={() => onDelete(app.name)}
        >
          <i className="bi bi-trash"></i>Delete
        </Button>
      </div>
    </Form>
  );
}

export default AppForm;
