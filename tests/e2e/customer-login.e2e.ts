import { expect, test } from "@playwright/test";

function getRequiredE2EEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name} in .env.e2e.local.`);
  }

  return value;
}

test("customer can log in and reach products page", async ({ page }) => {
  const email = getRequiredE2EEnv("E2E_CUSTOMER_EMAIL");
  const password = getRequiredE2EEnv("E2E_CUSTOMER_PASSWORD");

  await page.goto("/login?callbackUrl=/products");

  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);

  await page.locator('form button[type="submit"]').click();

  await expect(page).toHaveURL(/\/products(?:\?.*)?$/);
  await expect(page.locator("body")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Application error");
});
