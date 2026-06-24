import { expect, test, request } from "@playwright/test";

class APIUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {

        // Login API para obtener el token

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayload
        });
        const loginResponseJson = await loginResponse.json();

        return loginResponseJson.token;
    }

    async createOrder(orderPayload) {

        let response = {};
        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: {
                'Authorization': await response.token,
                'Content-Type': 'application/json'
            }
        });
        const orderResponseJson = await orderResponse.json();
        const orderID = orderResponseJson.orders[0];
        response.orderId = orderID;
        return response;
    }
}

export default APIUtils;