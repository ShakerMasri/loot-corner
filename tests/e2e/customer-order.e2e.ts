import { expect, test } from "@playwright/test";
import { getRequiredE2EPath } from "./helpers/auth";
import { clearCart } from "./helpers/cart";

type CreateOrderResponse = {
  message?: unknown;
  order?: {
    id?: unknown;
    status?: unknown;
    totalAmount?: unknown;
    items?: unknown;
  };
};

function getOrderId(data: CreateOrderResponse): string {
  const id = data.order?.id;

  if (typeof id !== "string" || !id.trim()) {
    throw new Error(`Order response did not include a valid order id.`);
  }

  return id;
}

test("customer can place a controlled test order", async ({ page }) => {
  const productPath = getRequiredE2EPath("E2E_ORDER_PRODUCT_PATH");

  await clearCart(page);

  try {
    await page.goto(productPath);

    const addToCartButton = page
      .getByRole("button", { name: /^add to cart$/i })
      .first();

    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toBeEnabled();

    const addToCartResponsePromise = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/cart/items" &&
        response.request().method() === "POST",
    );

    await addToCartButton.click();

    const addToCartResponse = await addToCartResponsePromise;

    expect(addToCartResponse.ok()).toBe(true);

    await page.goto("/cart");

    const placeOrderButton = page.locator("aside").getByRole("button").first();

    await expect(placeOrderButton).toBeVisible();
    await expect(placeOrderButton).toBeEnabled();

    const orderResponsePromise = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/orders" &&
        response.request().method() === "POST",
    );

    await placeOrderButton.click();

    const orderResponse = await orderResponsePromise;
    const orderData = (await orderResponse.json()) as CreateOrderResponse;

    expect(
      orderResponse.ok(),
      `Order API failed: ${JSON.stringify(orderData)}`,
    ).toBe(true);

    const orderId = getOrderId(orderData);

    await expect(page.locator("body")).toContainText(orderId);

    await page.goto("/orders");

    await expect(page).toHaveURL(/\/orders(?:\?.*)?$/);
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("body")).not.toContainText("Application error");
    await expect(page.locator("body")).toContainText(orderId);
  } finally {
    await clearCart(page);
  }
});
