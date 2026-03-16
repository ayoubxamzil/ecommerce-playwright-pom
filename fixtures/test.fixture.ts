import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { RegisterPage } from "../pages/register.page";
import { HomePage } from "../pages/home.page";
import { ResultsPage } from "../pages/results.page";
import { ProductPage } from "../pages/product.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
import users from "../data/users.json";

type User = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  postalCode?: string;
};

type PageFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  homePage: HomePage;
  resultsPage: ResultsPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

type UserFixtures = {
  validUser: User;
  incompleteUser: User;
  invalidUser: User;
};

type AuthFixtures = {
  authenticatedPage: {
    homePage: HomePage;
    resultsPage: ResultsPage;
    productPage: ProductPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
  };
};

export const test = base.extend<PageFixtures & UserFixtures & AuthFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  resultsPage: async ({ page }, use) => {
    await use(new ResultsPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  validUser: async ({}, use) => {
    await use(users.validUser);
  },
  incompleteUser: async ({}, use) => {
    await use(users.incompleteUser);
  },
  invalidUser: async ({}, use) => {
    await use(users.invalidUser);
  },

  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const resultsPage = new ResultsPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login(users.validUser.email, users.validUser.password);
    await homePage.assertUserIsLoggedIn();

    await use({ homePage, resultsPage, productPage, cartPage, checkoutPage });
  },
});

export { expect };
