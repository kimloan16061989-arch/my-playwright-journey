import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productItems = page.locator('.product-image-wrapper');
  }

  async goto() { await this.page.goto('https://automationexercise.com/products'); }
  async searchProduct(kw: string) {
    await this.searchInput.fill(kw);
    await this.searchButton.click();
  }
  async getProductCount() { return await this.productItems.count(); }
  async isSearchResultVisible() {
    return await this.page.getByText('SEARCHED PRODUCTS').isVisible();
  }
}