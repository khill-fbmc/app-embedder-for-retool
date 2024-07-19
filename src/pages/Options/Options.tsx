import "./Options.css";

import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import retoolLogo from "../../assets/img/retool.svg";
import { useChromeStorage } from "../../hooks/useChromeStorage";
import OptionsForm from "./OptionsForm";

import type { ExtensionSettings } from "../../types";

interface Props {
  title: string;
  settings: ExtensionSettings;
}

const Options: React.FC<Props> = ({ title, settings }) => {
  const { saveSettings, loadSettings } = useChromeStorage<ExtensionSettings>();

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <div className="d-flex align-items-center gap-3">
              <img
                id="retool-logo"
                alt="Retool Logo"
                src={retoolLogo}
              />
              <div className="mt-1">App Embedder{title && ` - ${title}`}</div>
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <OptionsForm
          settings={settings}
          saveSettings={saveSettings}
          loadSettings={loadSettings}
        />
      </Container>
    </>
  );
};

export default Options;
