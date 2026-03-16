import { expect, Locator, Page } from "@playwright/test";
import { selectors } from "../selectors/selectors";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly errorMsg: Locator;
  readonly loginContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator(selectors.login.emailInput);
    this.passwordInput = page.locator(selectors.login.emailInput);
    this.loginBtn = page.locator(selectors.login.emailInput);
    this.errorMsg = page.locator(selectors.login.emailInput);
    this.loginContainer = page.locator(selectors.login.loginContainer);
  }

  async navigate(): Promise<void> {
    await this.page.goto("/login");
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async assertErrorMsg(message: string): Promise<void> {
    await expect(this.errorMsg).toContainText(message);
  }

  async assertPageVisible(): Promise<void> {
    await expect(this.loginContainer).toBeVisible();
  }
}
