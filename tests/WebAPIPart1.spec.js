import { expect, test, request } from "@playwright/test";
import { create } from "node:domain";
import APIUtils from "./utils/APIUtils.js";


// para hacer una corrida con degug: npx playwright test --calendar.spec.js --debug
// se pueden seleccionar locators, diferentes a los que vienen del flujo,  
// para hacer la corrida con --ui, te permite seleccionar que queres corrar y las pantallas q va corriendo

const loginPayload = { userEmail: "mlestefania@hotmail.com", userPassword: "Automation$385" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

// https://rahulshettyacademy.com/api/ecom/order/create-order

//let token;
//let orderID;
//let apiContext;
let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test.beforeEach(() => {

});


test.only("Web Api validations", async ({ page }) => {

    //const ApiUtils = new APIUtils(apiContext, loginPayload);
    //const orderID = await ApiUtils.createOrder(orderPayload);

    //const email = apiUtils.loginPayload.userEmail;
    //const country = apiUtils.orderPayload.orders[0].country;

    //console.log("Order ID from API:", response.orderId);
    //const token = await ApiUtils.getToken();
    //console.log("Token:", token);

    const email = loginPayload.userEmail;
    const country = orderPayload.orders[0].country;

    await page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);
    //const email = loginPayload.userEmail;

    await page.goto("https://rahulshettyacademy.com/client/", { timeout: 60000 });
    await page.waitForLoadState("networkidle");
    ///////

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const orderTable = page.locator("tbody tr");


    const orderCount = await orderTable.count();
    let orderFound = false;

    for (let i = 0; i < orderCount; i++) {
        const rowText = await orderTable.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowText)) {
            orderFound = true;
            await orderTable.nth(i).locator("button").first().click();
            console.log("Orden encontrada en el historial:", response.orderId);
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();

    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();


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


    //// Validar que el producto en el detalle de la orden sea el mismo que se ordenó por API


});
