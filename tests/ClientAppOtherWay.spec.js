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


    // Verificar que el artículo esté en el carrito
    // Alternativamente, verificar que el artículo esté visible en el carrito

    //const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    //expect(bool).toBeTruthy();

    await page.getByText('ZARA COAT 3').isVisible();

    // Hacer checkout
    await page.getByRole("button", { name: "Checkout" }).click();
    await page.waitForLoadState("networkidle");

    // Ingresar datos de la tarjeta
    ///         await page.locator("[placeholder='Select Country']").pressSequentially("Argentina");
    ///         const countryDropdown = page.locator(".suggestions .ng-star-inserted");
    ///         await countryDropdown.filter({ hasText: "Argentina" }).click();
    //await page.locator("[placeholder='Select Country']").click();
    //await page.keyboard.type("Argentina");


    // Escribir el país
    await page.locator("[placeholder*='Select Country']").pressSequentially("ind", { delay: 150 });

    // Esperar y seleccionar la opción correcta
    // const countryOption = page.locator(".suggestions .ng-star-inserted", { hasText: "India" });
    //await countryOption.waitFor({ state: "visible" });
    //await countryOption.filter({ hasText: "Argentina" }).click();
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionCount = await dropdown.locator("button").count();
    let country
        ;
    for (let i = 0; i < optionCount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();

        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click();
            country = text.trim();
            break;
        }
    }

    /*
    const buttons = dropdown.locator("button");
    await buttons.first().waitFor({ state: "visible" });
    const btnCount = await buttons.count();
    for (let i = 0; i < btnCount; i++) {
        const text = await buttons.nth(i).textContent();
        if (text.trim() === "India") {
            await buttons.nth(i).click();
            break;
        }
    }
*/
    // .user__name [type="test"]
    expect(await page.locator(".user__name [type='text']").first()).toHaveText(email);


    //Presiono el boton de Place Order sin llenar el CVV para verificar que se muestre el mensaje de error

    await page.locator(".btnn").click();

    //const errorMessage = await page.locator(".alert-danger").textContent();
    //console.log("Error Message:", errorMessage);
    //expect(errorMessage).toContain("Please fill the CVV");



    // Seleccionar tarjeta de crédito Visa y llenar CVV
    /*
    await page.locator("input[type='radio'][value='VISA']").click();
    await page.locator("input[placeholder*='CVV']").fill("888");

    // Hacer clic en Place Order
    await page.locator("button:has-text('Place Order')").click();
    await page.waitForLoadState("networkidle");
    */

    // Copiar el código de la compra

    console.log("Esperando el mensaje de confirmación...");
    await page.locator(".hero-primary").waitFor({ state: "visible" });
    //const mensaje = await page.locator(".hero-primary").textContent({ timeout: 10000 });
    expect(page.locator(".hero-primary")).toContainText("Thankyou for the order.");

    //console.log("Mensaje de confirmación visible.", mensaje );

    //expect(page.locator(".hero-primary")).toContainText("Thank you for the order.");

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



