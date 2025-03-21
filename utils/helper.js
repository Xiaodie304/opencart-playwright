class Helper {
  constructor(page) {
    this.page = page;
    this.myAccountLink = page.getByRole("link", { name: " My Account " });
    this.loginLink = page.locator("#top").getByRole("link", { name: "Login" });
    this.emailField = page.getByRole("textbox", { name: "E-Mail Address" });
    this.passwordField = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.homeYourStore = page.getByRole("link", { name: "Your Store" });
  }
  async methodLogin() {
    await this.page.goto("/en-gb?route=common/home");
    await this.myAccountLink.click();
    await this.loginLink.click();
    await this.emailField.fill(process.env.TEST_USERNAME);
    await this.passwordField.fill(process.env.TEST_PASSWORD);
    await this.loginButton.click();
    await this.page.waitForNavigation();
  }
}
export default Helper;
