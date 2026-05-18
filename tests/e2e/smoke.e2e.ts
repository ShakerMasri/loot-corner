import { expect, test } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/loot corner/i);
  await expect(page.locator("body")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Application error");
});

test("products page loads", async ({ page }) => {
  await page.goto("/products");

  await expect(page.locator("body")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Application error");
});
