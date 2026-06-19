import { expect, test, request } from "@playwright/test";
import { create } from "node:domain";
import APIUtils from "./utils/APIUtils.js";


// para hacer una corrida con degug: npx playwright test --calendar.spec.js --debug
// se pueden seleccionar locators, diferentes a los que vienen del flujo,  
// para hacer la corrida con --ui, te permite seleccionar que queres corrar y las pantallas q va corriendo

//const loginPayload = { userEmail: "mlestefania@hotmail.com", userPassword: "Automation$385" };
//const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

// https://rahulshettyacademy.com/api/ecom/order/create-order

//let token;
//let orderID;
let apiContext;

test.beforeAll(async () => {

    apiContext = await request.newContext();

});

test.beforeEach(() => {

});


test.only("Web Api validations", async ({ page }) => {

    const ApiUtils = new APIUtils(apiContext);
    const orderID = await ApiUtils.createOrder();
    const email = ApiUtils.loginPayload.userEmail;
    const country = ApiUtils.orderPayload.orders[0].country;

    console.log("Order ID from API:", orderID);
    const token = await ApiUtils.getToken();
    console.log("Token:", token);


    await page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, token);
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
        if (rowText.includes(orderID)) {
            orderFound = true;
            await orderTable.nth(i).locator("button").first().click();
            console.log("Orden encontrada en el historial:", orderID);
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();

    await page.pause();
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

    ////


});
