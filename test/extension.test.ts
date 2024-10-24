import path from "path";
import { launch } from "puppeteer";
import { afterAll, assert, beforeAll, describe, expect, it } from "vitest";

import type { Browser, Page } from "puppeteer";

const extensionID = "kklmkhkakdgclkmbaelolndikehkhllo";
const extensionPath = path.join(import.meta.dirname, "../build");
const extensionOptionHtml = "options.html";
const extPage = `chrome-extension://${extensionID}/${extensionOptionHtml}`;

let browser: Browser;
let extensionPage: Page;

async function boot() {
  browser = await launch({
    // slowMo: 250,
    headless: false, // extension are allowed only in head-full mode
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  });

  extensionPage = await browser.newPage();
  await extensionPage.goto(extPage);
}

beforeAll(async () => await boot());

describe("options page", async function () {
  it("check title", async function () {
    const name = await extensionPage.evaluate(() =>
      document?.querySelector("footer a")?.textContent?.trim()
    );
    expect(name).toBe("Kevin Hill");
  });
});

// afterAll(async () => await browser.close());
