import { test, expect } from "../fixtures/test.fixture";

test.describe("login", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test("login page returns all elements", async ({ loginPage }) => {
    await loginPage.assertPageVisible();
  });

  test("valid credentials", async ({ loginPage, homePage, validUser }) => {
    await loginPage.login(validUser.email, validUser.password);
    await homePage.assertHomePageVisible();
  });

  test("invalid credentials", async ({ loginPage, invalidUser }) => {
    await loginPage.login(invalidUser.email, invalidUser.password);
    await loginPage.assertErrorMsg("Username and password do not match");
  });

  test("empty username error", async ({ loginPage }) => {
    await loginPage.login("", "ayoub123_");
    await loginPage.assertErrorMsg("Username is required");
  });

  test("empty password error", async ({ loginPage }) => {
    await loginPage.login("ayoub@gmail.com", "");
    await loginPage.assertErrorMsg("Password is required");
  });

  test("user can logout", async ({ loginPage, homePage, validUser }) => {
    await loginPage.login(validUser.email, validUser.password);
    await homePage.assertHomePageVisible();
    await homePage.logout();
    await loginPage.assertPageVisible();
  });
});
