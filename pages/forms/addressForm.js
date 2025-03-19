import Address from "../../data/addresses";
class AddressForm {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByRole("textbox", { name: "* First Name" });
    this.lastName = page.getByRole("textbox", { name: "* Last Name" });
    this.address1 = page.getByRole("textbox", { name: "* Address" });
    this.address2 = page.getByRole("textbox", { name: "Address 2" });
    this.city = page.getByRole("textbox", { name: "* City" });
    this.postCode = page.getByRole("textbox", { name: "* Post Code" });
    this.countryDropdown = page.getByLabel("Country");
    this.regionDropdown = page.getByLabel("Region / State");
  }
  async fillFullAddress() {
    const address = new Address();
    await this.firstName.fill(address.firstName);
    await this.lastName.fill(address.lastName);
    await this.address1.fill(address.address1);
    await this.address2.fill(address.address2);
    await this.city.fill(address.city);
    await this.postCode.fill(address.postCode);
    await this.countryDropdown.selectOption({ label: "United States" });
    await this.regionDropdown.selectOption({ label: "Texas" });
  }
}
export default AddressForm;
