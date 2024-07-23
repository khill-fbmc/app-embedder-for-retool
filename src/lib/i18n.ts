import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import i18n from "i18n";

const __dirname = dirname(fileURLToPath(import.meta.url));

const i = i18n.__;

i18n.configure({
  locales: ["en"],
  directory: path.join(__dirname, "..", "..", "locales"),
});

export { i, i18n };
