import "./Options.css";

import React from "react";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";

import extLogo from "../../assets/img/logo_32.png";
import retoolLogo from "../../assets/img/retool.svg";
import OptionsForm from "./OptionsForm";

import type { ExtensionSettings } from "../../types";

interface Props {
  settings: ExtensionSettings;
}

const Options: React.FC<Props> = ({ settings }) => {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container className="">
          <div className="d-flex mx-auto align-items-center gap-3">
            <img
              id="retool-logo"
              alt="Retool Logo"
              src={extLogo}
            />
            <div className="fs-2">App Embedder For</div>
            <img
              id="retool-logo"
              alt="Retool Logo"
              src={retoolLogo}
            />
          </div>
        </Container>
      </Navbar>
      <Container className="px-5 mt-4">
        <Row>
          <Col className="offset-1 col-10">
            <Alert variant="primary">
              <Alert.Heading>Welcome</Alert.Heading>To enable this exension, please fill in the
              required fields.
            </Alert>
          </Col>
        </Row>
        <OptionsForm settings={settings} />
      </Container>
      <div className="d-flex mt-5 py-2 bg-body-tertiary justify-content-center">
        <p className="my-auto">
          Made with ❤️ by <a href="https://community.retool.com/u/khill-fbmc">Kevin Hill</a>
        </p>
      </div>
    </>
  );
};

export default Options;
