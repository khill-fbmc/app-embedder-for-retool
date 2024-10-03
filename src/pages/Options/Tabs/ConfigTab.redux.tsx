import React, { useMemo, useReducer, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
// eslint-disable-next-line import/no-named-as-default
import toast from "react-hot-toast";

import { useActiveApp } from "@/hooks/useActiveApp";
import { debug, log } from "@/lib/logger";

import ActiveAppUrl from "../components/ActiveAppUrl";
import AppNameInput from "../components/AppNameInput";
import DomainInput from "../components/DomainInput";
import EnvironmentSelect from "../components/EnvironmentSelect";
import VersionInput from "../components/VersionInput";

import type { AppEnvironment, AppVersion, RetoolApp } from "@/types/extension";
// An enum with all the types of actions to use in our reducer
type ReducerActionKind = {
  SET_NAME: "SET_NAME";
  SET_VERSION: "SET_VERSION";
  SET_ENVIRONMENT: "SET_ENVIRONMENT";
  UPDATE_HASH: "UPDATE_HASH";
  UPDATE_QUERY: "UPDATE_QUERY";
};

type ReducerActions = {
  type: keyof ReducerActionKind;
  payload: string;
};

function appReducer(app: RetoolApp, action: ReducerActions): RetoolApp {
  debug(action);
  const { payload } = action;
  switch (action.type) {
    case "SET_NAME": {
      return { ...app, name: payload };
    }
    case "SET_VERSION": {
      return { ...app, version: payload as AppVersion };
    }
    case "SET_ENVIRONMENT": {
      return { ...app, env: payload as AppEnvironment };
    }
    case "UPDATE_HASH": {
      return { ...app, env: payload as AppEnvironment };
    }
    case "UPDATE_QUERY": {
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function OptionsForm() {
  const { app, updateApp } = useActiveApp();
  // const [draftApp, setDraftApp] = useState(() => Object.assign({}, app));
  const [draftApp, dispatch] = useReducer(appReducer, Object.assign({}, app));

  debug(draftApp);

  function setVersion(version: any) {
    dispatch({ type: "SET_VERSION", payload: version });
  }

  function handleChangeTask(task) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  /*
  const handleSaveSettings = async () => {
    debug("SAVING SETTINGS");

    if (domain === "") {
      toast.error(
        "Your Retool instance name cannot be blank, please fill in this field."
      );
      return;
    }

    try {
      await storage.save();
      toast.success("Settings saved.");
      storage.load();
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
  };
*/
  return (
    <>
      <Row className="mt-2">
        <Col lg={{ offset: 2, span: 8 }} sm={{ offset: 1, span: 10 }} xs={12}>
          <Form>
            <h3>General Config</h3>
            <DomainInput />

            <h3 className="mt-2">Current App</h3>
            <AppNameInput name={app?.name} onChange={(name) => debug(name)} />
            <Row>
              <Col sm={6} xs={12}>
                <VersionInput
                  version={app?.version}
                  onChange={(version) => debug(version)}
                />
              </Col>
              <Col sm={6} xs={12}>
                <EnvironmentSelect
                  env={app?.env}
                  onChange={(env) => debug(env)}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group
                  className="d-flex flex-column mb-4 gap-1"
                  controlId="url-params"
                >
                  <Form.Label>Extra URL Params</Form.Label>
                  {app?.query &&
                    app?.query.map((entry) => {
                      const key = `URL_${entry.index}`;
                      return (
                        <ParamInputGroup
                          {...entry}
                          key={key}
                          onKeyChange={({ index, target, data }) => {
                            debug(`[QUERY|SET]`, { key, index, target, data });
                            // setUrlParams((old) => {
                            //   return old.map((entry) => {
                            //     if (entry.index === index) {
                            //       entry[target] = data;
                            //     }
                            //     return entry;
                            //   });
                            // });
                          }}
                          onValueChange={({ index, target, data }) => {
                            debug(`[QUERY|SET]`, { key, index, target, data });
                            // setUrlParams((old) => {
                            //   return old.map((entry) => {
                            //     if (entry.index === index) {
                            //       entry[target] = data;
                            //     }
                            //     return entry;
                            //   });
                            // });
                          }}
                          onRemove={(indexToRemove) => {
                            debug("[QUERY|DEL]", { key, indexToRemove });
                            // setUrlParams((old) => {
                            //   return old.filter((entry) => {
                            //     return entry.index !== indexToRemove;
                            //   });
                            // });
                          }}
                        />
                      );
                    })}
                  <Button
                    className="btn-sm mx-5"
                    variant="primary"
                    onClick={(e) => {
                      debug("[QUERY|ADD]");
                      // setUrlParams((old) => {
                      //   const index =
                      //     old.length === 0 ? 1 : old[old.length - 1]?.index + 1;
                      //   return [
                      //     ...old,
                      //     {
                      //       index,
                      //       param: `uParam${index}`,
                      //       value: `uValue${index}`,
                      //     },
                      //   ];
                      // });
                    }}
                  >
                    Add +
                  </Button>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group
                  className="d-flex flex-column mb-4 gap-1"
                  controlId="hash-params"
                >
                  <Form.Label>Hash Params</Form.Label>
                  {app?.hash &&
                    app.hash.map((entry) => {
                      const key = `HASH_${entry.index}`;
                      return (
                        <ParamInputGroup
                          {...entry}
                          key={key}
                          onKeyChange={({ index, target, data }) => {
                            debug(`[HASH|SET]`, { key, index, target, data });
                            // setHashParams((old) => {
                            //   return old.map((entry) => {
                            //     if (entry.index === index) {
                            //       entry[target] = data;
                            //     }
                            //     return entry;
                            //   });
                            // });
                          }}
                          onValueChange={({ index, target, data }) => {
                            debug(`[HASH|SET]`, { key, index, target, data });
                            // setHashParams((old) => {
                            //   return old.map((entry) => {
                            //     if (entry.index === index) {
                            //       entry[target] = data;
                            //     }
                            //     return entry;
                            //   });
                            // });
                          }}
                          onRemove={(indexToRemove) => {
                            debug("[HASH|DEL]", { key, indexToRemove });
                            // setHashParams((old) => {
                            //   return old.filter((entry) => {
                            //     return entry.index !== indexToRemove;
                            //   });
                            // });
                          }}
                        />
                      );
                    })}
                  <Button
                    className="btn-sm mx-5"
                    variant="primary"
                    onClick={(e) => {
                      debug("[HASH|ADD]");
                      // setHashParams((old) => {
                      //   const index =
                      //     old.length === 0 ? 1 : old[old.length - 1]?.index + 1;
                      //   return [
                      //     ...old,
                      //     {
                      //       index,
                      //       param: `hParam${index}`,
                      //       value: `hValue${index}`,
                      //     },
                      //   ];
                      // });
                    }}
                  >
                    Add +
                  </Button>
                </Form.Group>
              </Col>
            </Row>

            <ActiveAppUrl />

            <div className="d-flex justify-content-center">
              <Button
                className="fs-5 mb-5 px-5"
                type="submit"
                variant="success"
                onClick={(e) => {
                  e.preventDefault();
                  // handleSaveSettings();
                  log("Saving");
                  return false;
                }}
              >
                Save
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default OptionsForm;

type ParamUpdate = {
  index: number;
  target: "param" | "value";
  data: string;
};

const ParamInputGroup: React.FC<{
  index: number;
  param: string;
  value: string;
  onRemove: (index: number) => void;
  onKeyChange: (data: ParamUpdate) => void;
  onValueChange: (data: ParamUpdate) => void;
}> = ({ index, param, value, onKeyChange, onValueChange, onRemove }) => {
  return (
    <InputGroup>
      <Form.Control
        placeholder="key"
        value={param}
        onChange={(e) => {
          onKeyChange({
            index,
            target: "param",
            data: e.target.value,
          });
        }}
      />
      <Form.Control
        placeholder="value"
        value={value}
        onChange={(e) => {
          onValueChange({
            index,
            target: "value",
            data: e.target.value,
          });
        }}
      />
      <Button onClick={(e) => onRemove(index)} variant="danger">
        <i className="bi bi-trash"></i>
      </Button>
    </InputGroup>
  );
};
