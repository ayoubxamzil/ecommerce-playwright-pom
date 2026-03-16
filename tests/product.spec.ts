import { test, expect } from "../fixtures/test.fixture";
import products from "../data/products.json";

test.describe("Product Page", () => {
  const target = products.recentProducts[0];

  test("Product page shows all elements", async ({ authenticatedPage }) => {
    const { homePage, productPage } = authenticatedPage;

    await homePage.clickRecentProductByName(target.name);
    await productPage.assertProductPageVisible(target.name);
  });

  test("Product price is shown correctly", async ({ authenticatedPage }) => {
    const { homePage, productPage } = authenticatedPage;

    await homePage.clickRecentProductByName(target.name);
    await productPage.assertProductPrice(target.price);
  });

  test("Add to cart from product page", async ({ authenticatedPage }) => {
    const { homePage, productPage } = authenticatedPage;

    await homePage.clickRecentProductByName(target.name);
    await productPage.assertAddToCartButtonVisible();
    await productPage.addToCart();
    await productPage.assertRemoveButtonVisible();
  });

  for (const qty of products.quantities) {
    test(`set quantity to ${qty}`, async ({ authenticatedPage }) => {
      const { homePage, productPage } = authenticatedPage;

      await homePage.clickRecentProductByName(target.name);
      await productPage.setQuantity(qty);
      await productPage.assertQuantity(qty);
    });
  }

  test("increase quantity", async ({ authenticatedPage }) => {
    const { homePage, productPage } = authenticatedPage;

    await homePage.clickRecentProductByName(target.name);
    await productPage.increaseQuantity(2);
    await productPage.assertQuantity(3);
  });

  test("decrease quantity", async ({ authenticatedPage }) => {
    const { homePage, productPage } = authenticatedPage;

    await homePage.clickRecentProductByName(target.name);
    await productPage.increaseQuantity(3);
    await productPage.decreaseQuantity(1);
    await productPage.assertQuantity(3);
  });

  test("remove from cart on product page", async ({ authenticatedPage }) => {
    const { homePage, productPage } = authenticatedPage;

    await homePage.clickRecentProductByName(target.name);
    await productPage.addToCart();
    await productPage.assertRemoveButtonVisible();
    await productPage.removeFromCart();
    await productPage.assertAddToCartButtonVisible();
  });

  test("back button returns to previous page", async ({
    authenticatedPage,
  }) => {
    const { homePage, productPage } = authenticatedPage;

    await homePage.clickRecentProductByName(target.name);
    await productPage.goBack();
    await homePage.assertHomePageVisible();
  });

  test("product is in stock", async ({ authenticatedPage }) => {
    const { homePage, productPage } = authenticatedPage;

    await homePage.clickRecentProductByName(target.name);
    await productPage.assertInStock();
  });
});
