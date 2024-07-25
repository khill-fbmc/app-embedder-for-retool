import { getMessage } from "@extend-chrome/messages";

import type { ExtensionSettings } from "../../types";

// getMessage returns [Function, Observable, Function]
export const [sendSettings, settingsStream, waitForSettings] =
  getMessage<Required<ExtensionSettings>>("settings");
