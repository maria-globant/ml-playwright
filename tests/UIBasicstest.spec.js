// corrida para ver las pantallas: npx playwright test --headed

import { expect, test } from "@playwright/test";

test("Browser Context Playwright test", async ({ browser }) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");


 
});


test("Page Playwright Test", async ({ page }) => 
{
    await page.goto("https://google.com/");

    console.log ("Titulo : ",await page.title());
    await expect (page).toHaveTitle("Google");
});