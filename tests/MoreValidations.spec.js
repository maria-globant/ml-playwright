import { expect, test } from "@playwright/test";

// para hacer una corrida con degug: npx playwright test --calendar.spec.js --debug
// se pueden seleccionar locators, diferentes a los que vienen del flujo,  
// para hacer la corrida con --ui, te permite seleccionar que queres corrar y las pantallas q va corriendo


test("Popup validations", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();

    await expect(page.locator("displayed-text")).toBeHidden();
});