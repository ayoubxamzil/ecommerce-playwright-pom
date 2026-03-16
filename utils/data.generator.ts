import { faker } from "@faker-js/faker";

export class DataGenerator {
  static firstName(): string {
    return faker.person.firstName();
  }

  static lastName(): string {
    return faker.person.lastName();
  }

  static fullName(): string {
    return faker.person.fullName();
  }

  static email(): string {
    return faker.internet.email();
  }

  static phone(): string {
    return faker.phone.number();
  }

  static zipCode(): string {
    return faker.location.zipCode();
  }

  static streetAddress(): string {
    return faker.location.streetAddress();
  }

  static password(): string {
    return faker.internet.password({ length: 10 });
  }

  static registrationData(): {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  } {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
      phone: faker.phone.number(),
    };
  }

  static checkoutFormData(): {
    firstName: string;
    lastName: string;
    postalCode: string;
  } {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };
  }
}
