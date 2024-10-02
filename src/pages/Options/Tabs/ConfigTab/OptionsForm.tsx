import React, { useMemo, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
// eslint-disable-next-line import/no-named-as-default
import toast, { Toaster } from "react-hot-toast";

import { useComposedUrl } from "../../../../hooks/useComposedUrl";
import { useExtensionState } from "../../../../hooks/useExtensionState";
import { useRetoolUrl } from "../../../../hooks/useRetoolUrl";
import { useWorkflow } from "../../../../hooks/useWorkflow";
import { debug, log } from "../../../../lib/logger";
import { storage } from "../../../../lib/storage";
import AppNameInput from "./AppNameInput";
import ComposedURL from "./ComposedURL";
import DomainInput from "./DomainInput";
import EnvironmentSelect from "./EnvironmentSelect";
import VersionInput from "./VersionInput";

import type { RetoolUrlConfig } from "../../../../lib/RetoolURL";
import type { SerializedSettings } from "../../../../lib/storage";
import type { UrlParamSpec } from "../../../../types";

type Props = {
  settings: SerializedSettings;
};

const OptionsForm: React.FC<Props> = ({ settings }) => {
  const extensionState = useExtensionState();
  const activeAppName = useExtensionState((s) => s.activeAppName);

  const [urlParams, setUrlParams] = useState<UrlParamSpec[]>(settings.urlParams);
  const [hashParams, setHashParams] = useState<UrlParamSpec[]>(settings.hashParams);

  const { url, domain, app, version, env, setApp, setDomain, setVersion, setEnv } = useRetoolUrl(
    settings as RetoolUrlConfig
  );

  const composedUrl = useMemo(() => {
    const _url = new URL(url);
    const _hashParams = new URLSearchParams();
    urlParams.forEach(({ param, value }) => _url.searchParams.append(param, value));
    hashParams.forEach(({ param, value }) => _hashParams.append(param, value));
    if (hashParams.length === 0) {
      return `${_url.toString()}`;
    }
    return `${_url.toString()}#${_hashParams.toString()}`;
  }, [url, urlParams, hashParams]);

  const handleSaveSettings = async () => {
    debug("SAVING SETTINGS");

    if (domain === "") {
      toast.error("Your Retool instance name cannot be blank, please fill in this field.");
      return;
    }

    try {
      await storage.save({
        domain,
        app,
        version,
        env,
        urlParams,
        hashParams,
        workflowUrl: "",
        workflowApiKey: "",
      });
      toast.success("Settings saved.");
      storage.load();
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
  };

  return (
    <>
      <Row className="mt-2">
        <Col
          xs={12}
          sm={{ offset: 1, span: 10 }}
        >
          <Form>
            <h3>General Config</h3>
            <DomainInput />

            <h3 className="mt-2">Current App</h3>
            <AppNameInput />
            <Row>
              <Col
                xs={12}
                sm={6}
              >
                <VersionInput
                  version={version}
                  onChange={setVersion}
                />
              </Col>
              <Col
                xs={12}
                sm={6}
              >
                <EnvironmentSelect
                  environment={env}
                  onChange={setEnv}
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
                  {urlParams.length > 0 &&
                    urlParams.map((entry) => {
                      const key = `URL_${entry.index}`;
                      return (
                        <ParamInputGroup
                          {...entry}
                          key={key}
                          onKeyChange={({ index, target, data }) => {
                            debug(`[SET]`, { key, index, target, data });
                            setUrlParams((old) => {
                              return old.map((entry) => {
                                if (entry.index === index) {
                                  entry[target] = data;
                                }
                                return entry;
                              });
                            });
                          }}
                          onValueChange={({ index, target, data }) => {
                            debug(`[SET]`, { key, index, target, data });
                            setUrlParams((old) => {
                              return old.map((entry) => {
                                if (entry.index === index) {
                                  entry[target] = data;
                                }
                                return entry;
                              });
                            });
                          }}
                          onRemove={(indexToRemove) => {
                            debug("[DEL]", { key, indexToRemove });
                            setUrlParams((old) => {
                              return old.filter((entry) => {
                                return entry.index !== indexToRemove;
                              });
                            });
                          }}
                        />
                      );
                    })}
                  <Button
                    variant="primary"
                    className="btn-sm mx-5"
                    onClick={(e) => {
                      setUrlParams((old) => {
                        const index = old.length === 0 ? 1 : old[old.length - 1]?.index + 1;
                        return [
                          ...old,
                          {
                            index,
                            param: `uParam${index}`,
                            value: `uValue${index}`,
                          },
                        ];
                      });
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
                  {hashParams.length > 0 &&
                    hashParams.map((entry) => {
                      const key = `HASH_${entry.index}`;
                      return (
                        <ParamInputGroup
                          {...entry}
                          key={key}
                          onKeyChange={({ index, target, data }) => {
                            debug(`[SET]`, { key, index, target, data });
                            setHashParams((old) => {
                              return old.map((entry) => {
                                if (entry.index === index) {
                                  entry[target] = data;
                                }
                                return entry;
                              });
                            });
                          }}
                          onValueChange={({ index, target, data }) => {
                            debug(`[SET]`, { key, index, target, data });
                            setHashParams((old) => {
                              return old.map((entry) => {
                                if (entry.index === index) {
                                  entry[target] = data;
                                }
                                return entry;
                              });
                            });
                          }}
                          onRemove={(indexToRemove) => {
                            debug("[DEL]", { key, indexToRemove });
                            setHashParams((old) => {
                              return old.filter((entry) => {
                                return entry.index !== indexToRemove;
                              });
                            });
                          }}
                        />
                      );
                    })}
                  <Button
                    variant="primary"
                    className="btn-sm mx-5"
                    onClick={(e) => {
                      debug("Adding Hash Param");
                      setHashParams((old) => {
                        const index = old.length === 0 ? 1 : old[old.length - 1]?.index + 1;
                        return [
                          ...old,
                          {
                            index,
                            param: `hParam${index}`,
                            value: `hValue${index}`,
                          },
                        ];
                      });
                    }}
                  >
                    Add +
                  </Button>
                </Form.Group>
              </Col>
            </Row>

            <ComposedURL
              url={composedUrl}
              title={app}
            />

            <div className="d-flex justify-content-center">
              <Button
                variant="success"
                type="submit"
                className="fs-5 mb-5 px-5"
                onClick={(e) => {
                  e.preventDefault();
                  handleSaveSettings();
                  return false;
                }}
              >
                Save
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Toaster />
    </>
  );
};

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
        value={param}
        placeholder="key"
        onChange={(e) => {
          onKeyChange({
            index,
            target: "param",
            data: e.target.value,
          });
        }}
      />
      <Form.Control
        value={value}
        placeholder="value"
        onChange={(e) => {
          onValueChange({
            index,
            target: "value",
            data: e.target.value,
          });
        }}
      />
      <Button
        variant="danger"
        onClick={(e) => onRemove(index)}
      >
        <i className="bi bi-trash"></i>
      </Button>
    </InputGroup>
  );
};
