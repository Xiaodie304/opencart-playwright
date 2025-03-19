import { faker } from "@faker-js/faker";

export class Address {
  constructor() {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.address1 = faker.location.streetAddress();
    this.address2 = faker.location.secondaryAddress();
    this.city = faker.location.city();
    this.postCode = faker.location.zipCode();
    this.country = "";
    this.region = "";
    this.telephone = faker.phone.number();
  }
}

export default Address;
