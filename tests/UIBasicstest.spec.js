// corrida para ver las pantallas: npx playwright test --headed

import { expect, test } from "@playwright/test";

test("Browser Context Playwright test", async ({ browser }) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/", { timeout: 60000 });

    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();

    console.log ("Titulo : ",await page.title());
    await expect (page).toHaveTitle("ProtoCommerce");
 
});

test("Successfully Login Password", async ({ browser }) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/", { timeout: 60000 });

    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signInBtn = page.locator("#signInBtn")
    const cardTitles = page.locator(".card-title a");  
                     
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");  
    await signInBtn.click();

    //console.log ("Elements  : ",await cardTitles.nth(0).inputValue());
    //console.log ("Elements  : ",await cardTitles.first().inputValue());
    //console.log ("Elements  : ",await cardTitles.nth(1).inputValue());

    await cardTitles.first().waitFor();   
    const allTitles = await cardTitles.allTextContents();
    console.log ("All Titles    : ", allTitles);

});

test("Wrong Login Password", async ({ browser }) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/", { timeout: 60000 });

    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("XXXXXXXXXX");
    await page.locator("#signInBtn").click();



    console.log(await page.locator("[style*='block']").textContent());

    await expect (page.locator("[style*='block']")).toContainText("Incorrect");
 
});

test("UI Controls", async ({ page }) => 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/", { timeout: 60000 });
    console.log("Titulo pagina: ", await page.title());

    const userName = page.locator("#username").fill("rahulshettyacademy");
    const password = page.locator("#password").fill("Learning@830$3mK2");
    const dropdown = page.locator("select.form-control");
    console.log(dropdown);
    await dropdown.selectOption("consult");

    await  page.locator(".radiotextsty").last().click()
    await page.locator("#okayBtn").click();

    await expect ( page.locator(".radiotextsty").last()).toBeChecked();

    await page.locator(".radiotextsty").first().click();
    await expect ( page.locator(".radiotextsty").first()).toBeChecked();
    await expect ( page.locator(".radiotextsty").last()).not.toBeChecked(); 

    await page.locator("#terms").check();
    await expect (page.locator("#terms")).toBeChecked();

    //await page.waitForTimeout(2000); 
    await page.locator("#terms").uncheck();
    expect ( await page.locator("#terms").isChecked()).toBeFalsy();


    await page.waitForTimeout(3000); 

//await page.pause(

});

test("Child Windows Handling", async ({ browser }) => 
{
       const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/", { timeout: 60000 });
    console.log("Titulo pagina: ", await page.title());

    const documentLink = page.locator("a[href*='documents-request']");
  
    const [newPage] = await Promise.all(
    [
        context.waitForEvent("page"),
        documentLink.click()
])

    console.log("Titulo pagina hija: ", await newPage.title());
    const text = await newPage.locator(".im-para.red").textContent();
    console.log("Texto de la pagina hija: ", text);
    const domain = text.split("@")[1].split(" ")[0];
    console.log("Email extraido: ", domain);

    await userName.fill(domain);

    console.log("Usuario: ", await userName.inputValue());

   // await page.waitForTimeout(3000); 

//await page.pause()
 });
