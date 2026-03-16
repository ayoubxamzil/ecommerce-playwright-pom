import { test, expect } from "../fixtures/test.fixture";
import products from "../data/products.json";

test.describe("cart", () => {
  for (const product of products.recentProducts) {
    test(`add "${product.name}" to cart`, async ({ authenticatedPage }) => {
      const { homePage, cartPage } = authenticatedPage;

      await homePage.addRecentProductToCart(product.name);
      await homePage.assertCartBadgeCount(1);
      await homePage.goToCart();
      await cartPage.assertProductInCart(product.name);
    });
  }

  test("add multiple products", async ({ authenticatedPage }) => {
    const { homePage, cartPage } = authenticatedPage;

    await homePage.addRecentProductToCart(products.recentProducts[0].name);
    await homePage.assertCartBadgeCount(1);

    await homePage.addRecentProductToCart(products.recentProducts[1].name);
    await homePage.assertCartBadgeCount(2);

    await homePage.goToCart();
    await cartPage.assertCartItemCount(2);
  });

  test("increase product quantity in cart", async ({ authenticatedPage }) => {
    const { homePage, cartPage } = authenticatedPage;
    const product = products.recentProducts[0];

    await homePage.addRecentProductToCart(product.name);
    await homePage.goToCart();

    await cartPage.increaseQuantity(product.name);
    await cartPage.assertProductQuantity(product.name, 2);
  });

  test("decrease product quantity in cart", async ({ authenticatedPage }) => {
    const { homePage, cartPage } = authenticatedPage;
    const product = products.recentProducts[0];

    await homePage.addRecentProductToCart(product.name);
    await homePage.goToCart();

    await cartPage.increaseQuantity(product.name);
    await cartPage.increaseQuantity(product.name);
    await cartPage.assertProductQuantity(product.name, 3);

    await cartPage.decreaseQuantity(product.name);
    await cartPage.assertProductQuantity(product.name, 2);
  });

  for (const product of products.recentProducts) {
    test(`remove "${product.name}" from cart`, async ({
      authenticatedPage,
    }) => {
      const { homePage, cartPage } = authenticatedPage;

      await homePage.addRecentProductToCart(product.name);
      await homePage.goToCart();
      await cartPage.assertProductInCart(product.name);

      await cartPage.removeProduct(product.name);
      await cartPage.assertProductNotInCart(product.name);
    });
  }

  test("removes all products from cart", async ({ authenticatedPage }) => {
    const { homePage, cartPage } = authenticatedPage;

    await homePage.addRecentProductToCart(products.recentProducts[0].name);
    await homePage.addRecentProductToCart(products.recentProducts[1].name);
    await homePage.goToCart();
    await cartPage.assertCartItemCount(2);

    await cartPage.clearCart();
    await cartPage.assertCartIsEmpty();
  });

  test("badge disappears when cart empty", async ({ authenticatedPage }) => {
    const { homePage, cartPage } = authenticatedPage;

    await homePage.addRecentProductToCart(products.recentProducts[0].name);
    await homePage.assertCartBadgeCount(1);
    await homePage.goToCart();
    await cartPage.removeProduct(products.recentProducts[0].name);
    await homePage.assertCartBadgeCount(0);
  });

  test("cart working after navigating away", async ({ authenticatedPage }) => {
    const { homePage, cartPage } = authenticatedPage;
    const product = products.recentProducts[0];

    await homePage.addRecentProductToCart(product.name);
    await homePage.clickRecentProductByName(products.recentProducts[1].name);
    await homePage.assertCartBadgeCount(1);
    await homePage.goToCart();
    await cartPage.assertProductInCart(product.name);
  });

  test("continue shopping returns to home", async ({ authenticatedPage }) => {
    const { homePage, cartPage } = authenticatedPage;

    await homePage.goToCart();
    await cartPage.continueShopping();
    await homePage.assertHomePageVisible();
  });
});
