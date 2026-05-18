import { expect, test } from "@playwright/test";
import { loginAsAdmin } from "./helpers/auth";

test("admin can log in and access products admin page", async ({ page }) => {
  await loginAsAdmin(page, "/admin/products");

  await expect(page).toHaveURL(/\/admin\/products(?:\?.*)?$/);
  await expect(page.locator("body")).toBeVisible();

  await expect(page.locator("body")).not.toContainText("Application error");
  await expect(page.locator("body")).not.toContainText("Unauthorized");
  await expect(page.locator("body")).not.toContainText("Forbidden");
});
