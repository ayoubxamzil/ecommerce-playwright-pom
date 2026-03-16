import { Page, Locator, expect } from "@playwright/test";
import { selectors } from "../selectors/selectors";

export class ProductPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly quantityInput: Locator;
  readonly increaseQty: Locator;
  readonly decreaseQty: Locator;
  readonly productImage: Locator;
  readonly backButton: Locator;
  readonly breadcrumb: Locator;
  readonly stockStatus: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator(selectors.product.name);
    this.productDescription = page.locator(selectors.product.description);
    this.productPrice = page.locator(selectors.product.price);
    this.addToCartButton = page.locator(selectors.product.addToCartBtn);
    this.removeButton = page.locator(selectors.product.removeBtn);
    this.quantityInput = page.locator(selectors.product.quantityInput);
    this.increaseQty = page.locator(selectors.product.increaseQty);
    this.decreaseQty = page.locator(selectors.product.decreaseQty);
    this.productImage = page.locator(selectors.product.image);
    this.backButton = page.locator(selectors.product.backBtn);
    this.breadcrumb = page.locator(selectors.product.breadcrumb);
    this.stockStatus = page.locator(selectors.product.stockStatus);
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }

  async setQuantity(qty: number): Promise<void> {
    await this.quantityInput.clear();
    await this.quantityInput.fill(String(qty));
  }

  async increaseQuantity(times: number = 1): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.increaseQty.click();
    }
  }

  async decreaseQuantity(times: number = 1): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.decreaseQty.click();
    }
  }

  async goBack(): Promise<void> {
    await this.backButton.click();
  }

  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent()) ?? "";
  }

  async getQuantityValue(): Promise<number> {
    const val = await this.quantityInput.inputValue();
    return parseInt(val, 10);
  }

  async assertProductPageVisible(expectedName: string): Promise<void> {
    await expect(this.productName).toBeVisible();
    await expect(this.productName).toHaveText(expectedName);
    await expect(this.productDescription).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productImage).toBeVisible();
  }

  async assertAddToCartButtonVisible(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
  }

  async assertRemoveButtonVisible(): Promise<void> {
    await expect(this.removeButton).toBeVisible();
  }

  async assertProductPrice(expected: string): Promise<void> {
    await expect(this.productPrice).toHaveText(expected);
  }

  async assertQuantity(expected: number): Promise<void> {
    await expect(this.quantityInput).toHaveValue(String(expected));
  }

  async assertInStock(): Promise<void> {
    await expect(this.stockStatus).toContainText("In Stock");
  }
}
