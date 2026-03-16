import { test, expect } from "../fixtures/test.fixture";
import { DataGenerator } from "../utils/data.generator";

test.describe("registration", () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.navigate();
  });

  test("registration page returns all elements", async ({ registerPage }) => {
    await registerPage.assertRegisterPageVisible();
  });

  test("valid registration with data", async ({ registerPage }) => {
    const data = DataGenerator.registrationData();
    await registerPage.fillAndSubmit(data);
    await registerPage.assertRegistrationSuccess();
  });

  test("first name required error", async ({ registerPage }) => {
    const data = DataGenerator.registrationData();
    await registerPage.fillAndSubmit({ ...data, firstName: "" });
    await registerPage.assertErrorMessage("First name is required");
  });

  test("last name required error", async ({ registerPage }) => {
    const data = DataGenerator.registrationData();
    await registerPage.fillAndSubmit({ ...data, lastName: "" });
    await registerPage.assertErrorMessage("Last name is required");
  });

  test("invalid email format error", async ({ registerPage }) => {
    const data = DataGenerator.registrationData();
    await registerPage.fillAndSubmit({ ...data, email: "notanemail" });
    await registerPage.assertErrorMessage("Invalid email");
  });

  test("required email error", async ({ registerPage }) => {
    const data = DataGenerator.registrationData();
    await registerPage.fillAndSubmit({ ...data, email: "" });
    await registerPage.assertErrorMessage("Email is required");
  });

  test("short password error", async ({ registerPage }) => {
    const data = DataGenerator.registrationData();
    await registerPage.fillAndSubmit({ ...data, password: "123" });
    await registerPage.assertErrorMessage("Password must be at least");
  });

  test("login link redirects to login page", async ({
    registerPage,
    loginPage,
  }) => {
    await registerPage.clickLoginLink();
    await loginPage.assertPageVisible();
  });
});
