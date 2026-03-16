import { Page, Locator, expect } from "@playwright/test";
import { selectors } from "../selectors/selectors";

export class HomePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly searchBar: Locator;
  readonly searchBtn: Locator;
  readonly recentSection: Locator;
  readonly recentProducts: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly burgerMenuButton: Locator;
  readonly logoutLink: Locator;
  readonly profileLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator(selectors.home.pageTitle);
    this.searchBar = page.locator(selectors.home.searchBar);
    this.searchBtn = page.locator(selectors.home.searchBtn);
    this.recentSection = page.locator(selectors.home.recentSection);
    this.recentProducts = page.locator(selectors.home.recentProductItem);
    this.cartLink = page.locator(selectors.home.cartLink);
    this.cartBadge = page.locator(selectors.home.cartBadge);
    this.burgerMenuButton = page.locator(selectors.home.burgerMenu);
    this.logoutLink = page.locator(selectors.home.logoutLink);
    this.profileLink = page.locator(selectors.home.profileLink);
  }

  async searchProduct(term: string): Promise<void> {
    await this.searchBar.fill(term);
    await this.searchBtn.click();
  }

  async searchWithEnter(term: string): Promise<void> {
    await this.searchBar.fill(term);
    await this.searchBar.press("Enter");
  }

  async clickRecentProductByName(productName: string): Promise<void> {
    const product = this.recentProducts.filter({ hasText: productName });
    await product.locator(selectors.home.recentProductName).click();
  }

  async addRecentProductToCart(productName: string): Promise<void> {
    const product = this.recentProducts.filter({ hasText: productName });
    await product.locator(selectors.home.recentAddToCartBtn).click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.burgerMenuButton.click();
    await this.logoutLink.click();
  }

  async goToProfile(): Promise<void> {
    await this.profileLink.click();
  }

  async assertHomePageVisible(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.recentSection).toBeVisible();
    await expect(this.searchBar).toBeVisible();
  }

  async assertRecentProductsVisible(): Promise<void> {
    await expect(this.recentProducts.first()).toBeVisible();
  }

  async assertRecentProductExists(productName: string): Promise<void> {
    const product = this.recentProducts.filter({ hasText: productName });
    await expect(product).toBeVisible();
  }

  async assertCartBadgeCount(expected: number): Promise<void> {
    if (expected === 0) {
      await expect(this.cartBadge).not.toBeVisible();
    } else {
      await expect(this.cartBadge).toHaveText(String(expected));
    }
  }

  async assertUserIsLoggedIn(): Promise<void> {
    await expect(this.page).toHaveURL("/home");
    await expect(this.pageTitle).toBeVisible();
  }
}
