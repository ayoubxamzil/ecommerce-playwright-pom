import { Page, Locator, expect } from "@playwright/test";
import { selectors } from "../selectors/selectors";

export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPassword: Locator;
  readonly phoneInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator(selectors.register.firstNameInput);
    this.lastNameInput = page.locator(selectors.register.lastNameInput);
    this.emailInput = page.locator(selectors.register.emailInput);
    this.passwordInput = page.locator(selectors.register.passwordInput);
    this.confirmPassword = page.locator(selectors.register.confirmPassword);
    this.phoneInput = page.locator(selectors.register.phoneInput);
    this.submitButton = page.locator(selectors.register.submitButton);
    this.successMessage = page.locator(selectors.register.successMessage);
    this.errorMessage = page.locator(selectors.register.errorMessage);
    this.loginLink = page.locator(selectors.register.loginLink);
  }

  async navigate(): Promise<void> {
    await this.page.goto("/register");
  }

  async fillForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  }): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.confirmPassword.fill(data.password);
    await this.phoneInput.fill(data.phone);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async fillAndSubmit(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  }): Promise<void> {
    await this.fillForm(data);
    await this.submit();
  }

  async clickLoginLink(): Promise<void> {
    await this.loginLink.click();
  }

  async assertRegisterPageVisible(): Promise<void> {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async assertRegistrationSuccess(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  async assertErrorMessage(text: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(text);
  }

  async assertRedirectedToLogin(): Promise<void> {
    await expect(this.page).toHaveURL("/login");
  }
}
