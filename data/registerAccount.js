import { faker } from "@faker-js/faker";

export class RegisterAccount {
  constructor() {
    const today = new Date();
    const dayNow = `${today.getFullYear()}${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`;
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.email = `${
      faker.internet.email().toLowerCase().split("@")[0]
    }_${dayNow}@example.com`;
    this.password = faker.internet.password({
      length: 12,
      memorable: false,
      pattern: /[A-Za-z0-9!@#$%^&*()]/,
    });
  }
}
export default RegisterAccount;
