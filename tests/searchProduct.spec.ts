import { test, expect } from "../fixtures/test.fixture";
import products from "../data/products.json";

test.describe("Search Products", () => {
  test("Product found in results", async ({ authenticatedPage }) => {
    const { homePage, resultsPage } = authenticatedPage;

    await homePage.searchProduct(products.searchTerms.exact);
    await resultsPage.assertResultsPageVisible();
    await resultsPage.assertProductFoundInResults(products.searchTerms.exact);
  });

  for (const product of products.recentProducts) {
    test(`valid search for "${product.name}"`, async ({
      authenticatedPage,
    }) => {
      const { homePage, resultsPage } = authenticatedPage;

      await homePage.searchProduct(product.name);
      await resultsPage.assertResultsPageVisible();
      await resultsPage.assertProductFoundInResults(product.name);
    });
  }

  test("no results found message", async ({ authenticatedPage }) => {
    const { homePage, resultsPage } = authenticatedPage;

    await homePage.searchProduct(products.searchTerms.invalid);
    await resultsPage.assertNoResultsFound();
  });

  test("click product in results and navigates to product page", async ({
    authenticatedPage,
  }) => {
    const { homePage, resultsPage, productPage } = authenticatedPage;
    const target = products.recentProducts[0];

    await homePage.searchProduct(target.name);
    await resultsPage.clickProductByName(target.name);
    await productPage.assertProductPageVisible(target.name);
  });

  test("add to cart from results page", async ({ authenticatedPage }) => {
    const { homePage, resultsPage, cartPage } = authenticatedPage;
    const target = products.recentProducts[0];

    await homePage.searchProduct(target.name);
    await resultsPage.addToCartFromResults(target.name);
    await homePage.assertCartBadgeCount(1);

    await homePage.goToCart();
    await cartPage.assertProductInCart(target.name);
  });
});
