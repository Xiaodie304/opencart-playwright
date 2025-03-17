import { expect } from "@playwright/test";
class DesktopsPage {
  constructor(page) {
    this.page = page;
    this.desktopsHeading = page.getByRole("heading", { name: "Desktops" });
    this.iMacProduct = page.getByRole("link", { name: "- Mac (1)" });
  }
  async expectDesktopsPage() {
    await expect(this.desktopsHeading).toBeVisible();
  }
  async clickIMacProduct() {
    await this.iMacProduct.click();
  }
}
export default DesktopsPage;
