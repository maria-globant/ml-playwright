// corrida para ver las pantallas: npx playwright test --headed

import { expect, test } from "@playwright/test";


test("@Web Client App login", async ({ page }) => 
{
    await page.goto("https://rahulshettyacademy.com/client/", { timeout: 60000 });
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

test.only("@Web E2E Client App", async ({ page }) => 
{
    await page.goto("https://rahulshettyacademy.com/client/", { timeout: 60000 });
    const userName = await page.locator("#userEmail").fill("laura@may.com");
    const password = await page.locator("#userPassword").fill("Automation@123");
    //const signInBtn = page.locator("[value='Login']").click();
    const signInBtn = page.locator("#login")
    await signInBtn.click();

    await page.waitForLoadState("networkidle");

    //await page.locator(".card-body b").first().waitFor();    
    const tiles = await page.locator(".card-body b").allTextContents();
    console.log(tiles);

    // Seleccionar el artículo de Zara y agregarlo al carrito
    const product = page.locator(".card-body");
    console.log("Cantidad de productos:", await product.count());
    const count = await product.count()

    for (let i = 0; i < count; i++) {
        const title = await product.nth(i).locator("b").textContent();
        console.log("Producto:", title);
        if (title.trim() === "ZARA COAT 3") {
            await product.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    // Ir al carrito
    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.waitForLoadState("networkidle");

    // Hacer checkout
    await page.locator("button:has-text('Checkout')").click();
    await page.waitForLoadState("networkidle");

    // Ingresar datos de la tarjeta
    await page.locator("[placeholder='Select Country']").pressSequentially("Argentina");
    const countryDropdown = page.locator(".suggestions .ng-star-inserted");
    await countryDropdown.filter({ hasText: "Argentina" }).click();
    //await page.locator("[placeholder='Select Country']").click();
    //await page.keyboard.type("Argentina");

    // Seleccionar tarjeta de crédito Visa y llenar CVV
    await page.locator("input[type='radio'][value='VISA']").click();
    await page.locator("input[placeholder*='CVV']").fill("888");

    // Hacer clic en Place Order
    await page.locator("button:has-text('Place Order')").click();
    await page.waitForLoadState("networkidle");

    // Copiar el código de la compra
    const orderIdText = await page.locator(".hero-primary").textContent();
    const orderId = orderIdText.match(/\|?\s*([A-Za-z0-9]+)\s*\|?/)?.[1] ?? "";
    console.log("Order ID:", orderId);

    // Ir al historial de compras
    await page.locator("button:has-text('Orders')").click();
    await page.waitForLoadState("networkidle");

    // Buscar la compra en el historial
    await page.locator("input[placeholder='Search Order Ids']").fill(orderId);
    const orderRow = page.locator("tbody tr").filter({ hasText: orderId });
    await expect(orderRow).toBeVisible();
    console.log("Orden encontrada en el historial:", orderId);

});



