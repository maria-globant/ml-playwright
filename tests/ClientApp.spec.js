// corrida para ver las pantallas: npx playwright test --headed

import { expect, test } from "@playwright/test";


test("@Web Client App login", async ({ page }) => 
{
    await page.goto("https://rahulshettyacademy.com/client/");
    const userName = await page.locator("#userEmail").fill("laura@may.com");
    const password = await page.locator("#userPassword").fill("Automation@123");
    //const signInBtn = page.locator("[value='Login']").click();
    const signInBtn = page.locator("#login")
    await signInBtn.click();

    await page.waitForLoadState("networkidle");

    //await page.locator(".card-body b").first().waitFor();    

    const tiles = await page.locator(".card-body b").allTextContents();

    console.log(tiles);

});



