import { expect, test, request } from "@playwright/test";

// para hacer una corrida con degug: npx playwright test --calendar.spec.js --debug
// se pueden seleccionar locators, diferentes a los que vienen del flujo,  
// para hacer la corrida con --ui, te permite seleccionar que queres corrar y las pantallas q va corriendo

const loginPayload = { userEmail: "mlestefania@hotmail.com", userPassword: "Automation$385" };

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginPayload
    });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = loginResponse.json();
    const token = (await loginResponseJson).token;
    console.log("Token:", token);



});

test.beforeEach(() => {

});


test.only("Web Api validations", async ({ page }) => {

    /*
    const email = "laura@may.com"
    await page.goto("https://rahulshettyacademy.com/client/", { timeout: 60000 });
    const userName = await page.locator("#userEmail").fill(email);
    const password = await page.locator("#userPassword").fill("Automation@123");
    //const signInBtn = page.locator("[value='Login']").click();
    const signInBtn = page.locator("#login")
    await signInBtn.click();
    */

    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();

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
            console.log("Producto agregado al carrito:", i, title);
            break;
        }
    }

    // Ir al carrito
    await page.locator("[routerlink*='/cart']").click();
    await page.locator("div li").first().waitFor({ state: "visible" });

    // Verificar que el artículo esté en el carrito
    // Alternativamente, verificar que el artículo esté visible en el carrito

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    // Hacer checkout
    await page.locator("button:has-text('Checkout')").click();
    await page.waitForLoadState("networkidle");

    // Ingresar datos de la tarjeta
    // Escribir el país
    await page.locator("[placeholder*='Select Country']").pressSequentially("ind", { delay: 150 });

    // Esperar y seleccionar la opción correcta

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

    expect(await page.locator(".user__name [type='text']").first()).toHaveText(email);


    //Presiono el boton de Place Order sin llenar el CVV para verificar que se muestre el mensaje de error

    await page.locator(".btnn").click();

    // Copiar el código de la compra

    console.log("Esperando el mensaje de confirmación...");
    await page.locator(".hero-primary").waitFor({ state: "visible" });
    //const mensaje = await page.locator(".hero-primary").textContent({ timeout: 10000 });
    expect(page.locator(".hero-primary")).toContainText("Thankyou for the order.");

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
