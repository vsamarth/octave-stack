import { test, expect } from "@playwright/test";

test.describe("Sign in", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("has title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Sign in to your account" }),
    ).toBeVisible();
  });

  test("social login redirects to google", async ({ page }) => {
    await page.getByRole("link", { name: /Google/ }).click();
    await expect(async () => {
      expect(page.url()).toContain("accounts.google.com");
    }).toPass();
  });
});
