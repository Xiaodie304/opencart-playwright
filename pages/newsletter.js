import { expect } from "@playwright/test";
class NewsletterPage {
  constructor(page) {
    this.page = page;
    this.newsletterButton = page.locator("#input-newsletter");
  }
  async expectNewsletterOff() {
    await expect(this.newsletterButton).not.toBeChecked();
  }
}
export default NewsletterPage;
