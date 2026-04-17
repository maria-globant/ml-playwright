import { expect, test } from "@playwright/test";


test.only("Playwright special locators", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/", { timeout: 60000 });

    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Automation@123");
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", { name: "Shop" }).click();
    //await page.locator(".container").getByText("ProtoCommerce Home").isVisible();
    //await page.locator('.col-lg-9').waitFor()

    await page.locator("h1[class='my-4']").isVisible()
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();



});
