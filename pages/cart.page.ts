import { Page, Locator, expect } from "@playwright/test";
import { selectors } from "../selectors/selectors";

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly clearCartButton: Locator;
  readonly subtotal: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator(selectors.cart.pageTitle);
    this.cartItems = page.locator(selectors.cart.cartItem);
    this.checkoutButton = page.locator(selectors.cart.checkoutBtn);
    this.continueShoppingButton = page.locator(selectors.cart.continueShopBtn);
    this.clearCartButton = page.locator(selectors.cart.clearCartBtn);
    this.subtotal = page.locator(selectors.cart.subtotal);
    this.emptyCartMessage = page.locator(selectors.cart.emptyCartMessage);
  }

  async removeProduct(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await item.locator(selectors.cart.removeItemBtn).click();
  }

  async increaseQuantity(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await item.locator(selectors.cart.increaseQtyBtn).click();
  }

  async decreaseQuantity(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await item.locator(selectors.cart.decreaseQtyBtn).click();
  }

  async getProductQuantity(productName: string): Promise<number> {
    const item = this.cartItems.filter({ hasText: productName });
    const qty = await item.locator(selectors.cart.cartItemQty).inputValue();
    return parseInt(qty, 10);
  }

  async clearCart(): Promise<void> {
    await this.clearCartButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async getSubtotal(): Promise<string> {
    return (await this.subtotal.textContent()) ?? "";
  }

  async assertCartPageVisible(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.page).toHaveURL("/cart");
  }

  async assertCartIsEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
    await expect(this.emptyCartMessage).toBeVisible();
  }

  async assertProductInCart(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await expect(item).toBeVisible();
  }

  async assertProductNotInCart(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await expect(item).not.toBeVisible();
  }

  async assertCartItemCount(expected: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(expected);
  }

  async assertProductQuantity(
    productName: string,
    expected: number,
  ): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await expect(item.locator(selectors.cart.cartItemQty)).toHaveValue(
      String(expected),
    );
  }
}
