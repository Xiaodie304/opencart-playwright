const { defineConfig } = require("@playwright/test");
const dotenv = require("dotenv");

dotenv.config();

module.exports = defineConfig({
  testDir: "tests",
  maxFailures: 10,
  workers: 1,
  retries: 0,
  fullyParallel: false,
  use: {
    headless: false,
    viewport: { width: 1366, height: 768 },
    baseURL: process.env.BASE_URL,
    reporter: [["html", { outputFolder: "playwright-report" }]],
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "e2e",
      use: { browserName: "chromium" },
    },
  ],
});
