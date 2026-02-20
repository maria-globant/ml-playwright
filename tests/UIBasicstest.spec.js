// corrida para ver las pantallas: npx playwright test --headed

import { expect, test } from "@playwright/test";

test("Browser Context Playwright test", async ({ browser }) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();

    console.log ("Titulo : ",await page.title());
    await expect (page).toHaveTitle("ProtoCommerce");
 
});

test.only("Login Wrong Password", async ({ browser }) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("XXXXXXXXXX");
    await page.locator("#signInBtn").click();


    console.log(await page.locator("[style*='block']").textContent());

    await expect (page.locator("[style*='block']")).toContainText("Incorrect");
 
});


test("Page Playwright Test", async ({ page }) => 
{
    await page.goto("https://google.com/");

    console.log ("Titulo : ",await page.title());
    await expect (page).toHaveTitle("Google");
});