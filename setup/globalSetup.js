import { chromium, firefox, webkit } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

async function saveState(browserType, path) {
  const browser = await browserType.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(`${process.env.BASE_URL}/en-gb?route=account/login`);
  await page
    .getByRole("textbox", { name: "E-Mail Address" })
    .fill(process.env.TEST_USERNAME);
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(process.env.TEST_PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();

  await context.storageState({ path });

  console.log(`✅ State saved: ${path}`);
  await browser.close();
}

async function globalSetup() {
  await saveState(chromium, "storage/state-chromium.json");
  await saveState(firefox, "storage/state-firefox.json");
  await saveState(webkit, "storage/state-webkit.json");
}

export default globalSetup;
