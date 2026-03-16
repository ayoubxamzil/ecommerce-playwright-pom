import { Page, Locator, expect } from "@playwright/test";
import { selectors } from "../selectors/selectors";

export class ResultsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly searchResults: Locator;
  readonly productItems: Locator;
  readonly noResults: Locator;
  readonly resultCount: Locator;
  readonly sortDropdown: Locator;
  readonly filterSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator(selectors.results.pageTitle);
    this.searchResults = page.locator(selectors.results.searchResults);
    this.productItems = page.locator(selectors.results.productItem);
    this.noResults = page.locator(selectors.results.noResults);
    this.resultCount = page.locator(selectors.results.resultCount);
    this.sortDropdown = page.locator(selectors.results.sortDropdown);
    this.filterSection = page.locator(selectors.results.filterSection);
  }

  async clickProductByName(productName: string): Promise<void> {
    const product = this.productItems.filter({ hasText: productName });
    await product.locator(selectors.results.productName).click();
  }

  async addToCartFromResults(productName: string): Promise<void> {
    const product = this.productItems.filter({ hasText: productName });
    await product.locator(selectors.results.addToCartBtn).click();
  }

  async assertResultsPageVisible(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.searchResults).toBeVisible();
  }

  async assertProductFoundInResults(productName: string): Promise<void> {
    const product = this.productItems.filter({ hasText: productName });
    await expect(product).toBeVisible();
  }

  async assertNoResultsFound(): Promise<void> {
    await expect(this.noResults).toBeVisible();
    await expect(this.productItems).toHaveCount(0);
  }

  async assertResultCount(expected: number): Promise<void> {
    await expect(this.productItems).toHaveCount(expected);
  }

  async assertRedirectedToResults(): Promise<void> {
    await expect(this.page).toHaveURL(/\/results/);
  }
}
