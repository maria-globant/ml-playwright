import { expect, test, request } from "@playwright/test";

class APIUtils {

    constructor(apiContext) {
        this.apiContext = apiContext;
        this.orderPayload = {
            orders: [
                {
                    country: "Argentina",
                    productOrderedId: "6960eac0c941646b7a8b3e68"
                }
            ]
        };
        this.loginPayload = {
            userEmail: "mlestefania@hotmail.com",
            userPassword: "Automation$385"
        };
    }

    async getToken() {

        // Login API para obtener el token

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayload
        });
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();

        return loginResponseJson.token;
    }

    async createOrder() {

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: this.orderPayload,
            headers: {
                'Authorization': await this.getToken(),
                'Content-Type': 'application/json'
            }
        });
        const orderResponseJson = await orderResponse.json();
        const orderID = orderResponseJson.orders[0];
        return orderID;
    }
}

export default APIUtils;