import { expect, test } from "@playwright/test";

test("Ecommerce page", async ({ browser }) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signInBtn = page.locator("#signInBtn")
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");  
    //await signInBtn.click();


    await Promise.all([page.waitForURL('**/angularpractice/shop'), page.click('#signInBtn')]);
    console.log ("Titulo : ",await page.title());
 
});