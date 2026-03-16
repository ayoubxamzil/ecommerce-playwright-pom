import { Page, Locator, expect } from "@playwright/test";
import { selectors } from "../selectors/selectors";

export class CheckoutPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly postalCodeInput: Locator;
  readonly countryInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly stepOneTitle: Locator;
  readonly errorMessage: Locator;

  readonly stepTwoTitle: Locator;
  readonly orderSummaryItems: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  readonly confirmationTitle: Locator;
  readonly confirmationMessage: Locator;
  readonly orderNumber: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator(selectors.checkout.firstName);
    this.lastNameInput = page.locator(selectors.checkout.lastName);
    this.emailInput = page.locator(selectors.checkout.email);
    this.phoneInput = page.locator(selectors.checkout.phone);
    this.addressInput = page.locator(selectors.checkout.address);
    this.cityInput = page.locator(selectors.checkout.city);
    this.postalCodeInput = page.locator(selectors.checkout.postalCode);
    this.countryInput = page.locator(selectors.checkout.country);
    this.continueButton = page.locator(selectors.checkout.continueButton);
    this.cancelButton = page.locator(selectors.checkout.cancelButton);
    this.stepOneTitle = page.locator(selectors.checkout.title);
    this.errorMessage = page.locator(selectors.checkout.errorMessage);

    this.stepTwoTitle = page.locator(selectors.checkout.title);
    this.orderSummaryItems = page.locator(selectors.checkout.orderSummaryItems);
    this.subtotalLabel = page.locator(selectors.checkout.subtotal);
    this.taxLabel = page.locator(selectors.checkout.tax);
    this.totalLabel = page.locator(selectors.checkout.total);
    this.finishButton = page.locator(selectors.checkout.finishButton);

    this.confirmationTitle = page.locator(selectors.checkout.confirmation);
    this.confirmationMessage = page.locator(selectors.checkout.confirmationMsg);
    this.orderNumber = page.locator(selectors.checkout.orderNumber);
    this.backHomeButton = page.locator(selectors.checkout.backHome);
  }

  async fillShippingInfo(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  }): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    await this.addressInput.fill(data.address);
    await this.cityInput.fill(data.city);
    await this.postalCodeInput.fill(data.postalCode);
    await this.countryInput.fill(data.country);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async getTotalPrice(): Promise<string> {
    return (await this.totalLabel.textContent()) ?? "";
  }

  async getOrderNumber(): Promise<string> {
    return (await this.orderNumber.textContent()) ?? "";
  }

  async assertStepOneVisible(): Promise<void> {
    await expect(this.stepOneTitle).toHaveText("Your Information");
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
  }

  async assertStepTwoVisible(): Promise<void> {
    await expect(this.stepTwoTitle).toHaveText("Overview");
    await expect(this.finishButton).toBeVisible();
  }

  async assertOrderConfirmed(): Promise<void> {
    await expect(this.confirmationTitle).toHaveText("Thank you for your order");
    await expect(this.confirmationMessage).toBeVisible();
    await expect(this.orderNumber).toBeVisible();
    await expect(this.backHomeButton).toBeVisible();
  }

  async assertErrorMessage(text: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(text);
  }

  async assertOrderSummaryItemCount(expected: number): Promise<void> {
    await expect(this.orderSummaryItems).toHaveCount(expected);
  }
}
