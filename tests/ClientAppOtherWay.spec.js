// corrida para ver las pantallas: npx playwright test --headed

import { expect, test } from "@playwright/test";


test("@Web E2E Client App", async ({ page }) => {
    const email = "laura@may.com"
    await page.goto("https://rahulshettyacademy.com/client/", { timeout: 60000 });
    const userName = await page.getByPlaceholder("email@example.com").fill(email);
    const password = await page.getByPlaceholder("enter your passsword").fill("Automation@123");
    //const signInBtn = page.locator("[value='Login']").click();
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" }).getByRole("button", { name: " Add To Cart" }).click();

    // Seleccionar el artículo de Zara y agregarlo al carrito
    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();
    await page.locator("div li").first().waitFor({ state: "visible" });

    await expect(page.getByText('ZARA COAT 3')).toBeVisible();

    // Hacer checkout
    await page.getByRole("button", { name: "Checkout" }).click();
    await page.waitForLoadState("networkidle");


    // Escribir el país
    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionCount = await dropdown.locator("button").count();
    let country;
    for (let i = 0; i < optionCount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();

        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click();
            country = text.trim();
            break;
        }
    }
    /* se podría usar también, pero está forzado el 1
    await dropdown.locator("button", { hasText: "India" }).nth(1).click();
    */

    expect(await page.locator(".user__name [type='text']").first()).toHaveText(email);


    //Presiono el boton de Place Order sin llenar el CVV para verificar que se muestre el mensaje de error
    await page.getByText("Place Order ").click();


    // Copiar el código de la compra

    console.log("Esperando el mensaje de confirmación...");
    await page.locator(".hero-primary").waitFor({ state: "visible" });
    //const mensaje = await page.locator(".hero-primary").textContent({ timeout: 10000 });
    expect(page.getByText("Thankyou for the order.")).toBeVisible();

    const orderIDRaw = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const orderID = orderIDRaw.replace(/\|/g, "").trim();

    console.log("Order ID:", orderIDRaw, orderID);

    await page.locator(".fa-handshake-o").click();
    await page.waitForLoadState("networkidle");

    // Validar que estamos en la página con la tabla "My Orders"

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const orderTable = page.locator("tbody tr");


    const orderCount = await orderTable.count();
    let orderFound = false;

    for (let i = 0; i < orderCount; i++) {
        const rowText = await orderTable.nth(i).locator("th").textContent();
        if (rowText.includes(orderID)) {
            orderFound = true;
            await orderTable.nth(i).locator("button").first().click();
            console.log("Orden encontrada en el historial:", orderID);
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();

    await page.locator(".email-wrapper").waitFor({ state: "visible" });

    //const orderIdSummaryDetails = await page.locator(".email-container");

    const billingEmail = await page.locator('div.address', { hasText: 'Billing Address' }).locator('p.text').nth(0).textContent();
    const billingEmailCountryFull = await page.locator('div.address', { hasText: 'Billing Address' }).locator('p.text').nth(1).textContent();

    const deliveryEmail = await page.locator('div.address', { hasText: 'Delivery Address' }).locator('p.text').nth(0).textContent();
    const deliveryCountryFull = await page.locator('div.address', { hasText: 'Delivery Address' }).locator('p.text').nth(1).textContent();

    const billingEmailCountry = billingEmailCountryFull.split(" - ")[1].trim(); // "India"
    const deliveryCountry = deliveryCountryFull.split(" - ")[1].trim(); // "India"


    expect(billingEmail.trim()).toBe(email);
    expect(deliveryEmail.trim()).toBe(email);
    expect(billingEmailCountry.trim()).toBe(country);
    expect(deliveryCountry.trim()).toBe(country);

});



