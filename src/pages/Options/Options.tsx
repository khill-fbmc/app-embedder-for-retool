import "./Options.css";

import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import retoolLogo from "../../assets/img/retool.svg";
import { useChromeStorage } from "../../hooks/useChromeStorage";
import OptionsForm from "./OptionsForm";

import type { ExtensionSettings } from "../../lib/types";

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  const { loadSettings, saveSettings } = useChromeStorage<ExtensionSettings>();
  const [settings, setSettings] = useState<ExtensionSettings>({});

  // No dependencies = Run once on page load
  useEffect(() => {
    const load = async () => {
      setSettings(await loadSettings());
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        />
      </Container>
    </>
  );
};

export default Options;
