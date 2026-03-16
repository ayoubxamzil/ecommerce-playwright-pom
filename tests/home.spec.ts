import { test, expect } from "../fixtures/test.fixture";
import products from "../data/products.json";

test.describe("home page", () => {
  test("home page visible after login", async ({ authenticatedPage }) => {
    await authenticatedPage.homePage.assertHomePageVisible();
  });

  test("recently added products section is visible", async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.homePage.assertRecentProductsVisible();
  });

  for (const product of products.recentProducts) {
    test(`recent product "${product.name}" is visible`, async ({
      authenticatedPage,
    }) => {
      await authenticatedPage.homePage.assertRecentProductExists(product.name);
    });
  }

  for (const product of products.recentProducts) {
    test(`add "${product.name}" to cart from home`, async ({
      authenticatedPage,
    }) => {
      const { homePage, cartPage } = authenticatedPage;

      await homePage.addRecentProductToCart(product.name);
      await homePage.assertCartBadgeCount(1);

      await homePage.goToCart();
      await cartPage.assertProductInCart(product.name);
    });
  }

  test("click recent product navigates to product page", async ({
    authenticatedPage,
  }) => {
    const { homePage, productPage } = authenticatedPage;
    const target = products.recentProducts[0];

    await homePage.clickRecentProductByName(target.name);
    await productPage.assertProductPageVisible(target.name);
  });

  test("search from home redirects to results page", async ({
    authenticatedPage,
  }) => {
    const { homePage, resultsPage } = authenticatedPage;

    await homePage.searchProduct(products.searchTerms.exact);
    await resultsPage.assertRedirectedToResults();
    await resultsPage.assertProductFoundInResults(products.searchTerms.exact);
  });

  test("cart badge updates when products added", async ({
    authenticatedPage,
  }) => {
    const { homePage } = authenticatedPage;

    await homePage.addRecentProductToCart(products.recentProducts[0].name);
    await homePage.assertCartBadgeCount(1);

    await homePage.addRecentProductToCart(products.recentProducts[1].name);
    await homePage.assertCartBadgeCount(2);
  });

  test("user can logout from home page", async ({
    authenticatedPage,
    loginPage,
  }) => {
    await authenticatedPage.homePage.logout();
    await loginPage.assertPageVisible();
  });
});
