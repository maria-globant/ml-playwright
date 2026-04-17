import { expect, test } from "@playwright/test";


test.only("Playwright special locators", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/", { timeout: 60000 });

    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");


});
