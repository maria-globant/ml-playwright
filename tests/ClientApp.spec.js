// corrida para ver las pantallas: npx playwright test --headed

import { expect, test } from "@playwright/test";


test("@Web Client App login", async ({ page }) => 
{
    await page.goto("https://rahulshettyacademy.com/client/");
    const userName = await page.locator("#userEmail").fill("anshika@gmail.com");
    const password = await page.locator("#userPassword").fill("Iamking@000");
    //const signInBtn = page.locator("[value='Login']").click();
    const signInBtn = page.locator("#login")
    await signInBtn.click();

    //await page.waitForLoadState("networkidle");

   await page.locator(".card-body b").first().waitFor();    

    const tiles = await page.locator(".card-body b").allTextContents();

    console.log(tiles);

});

test.only("UI Controls", async ({ page }) => 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log("Titulo pagina: ", await page.title());

    const userName = await page.locator("#username").fill("rahulshettyacademy");
    const password = await page.locator("#password").fill("Learning@830$3mK2");


    const dropdown = await page.locator("select.form-control").allTextContents();
    console.log(dropdown);

    //page.pause()

    console.log("OPTION: ", await page.locator("select.form-control").selectOption("consult"));

    await  page.locator(".radiotextsty").last().click()

    await page.locator("#okayBtn").click();

    const primero =  await page.locator(".checkmark")

    console.log ("UNO: ",primero);

});

