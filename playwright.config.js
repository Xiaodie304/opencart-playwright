import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "tests",
  workers: 1,
  reporter: [["html", { open: "never" }]],
  globalSetup: "./setup/globalSetup.js",
  use: {
    headless: false,
    viewport: { width: 1366, height: 768 },
    baseURL: process.env.BASE_URL,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    //storageState: undefined,
  },
  projects: [
    {
      name: "e2e",
      use: { browserName: "chromium" },
    },
  ],
});
