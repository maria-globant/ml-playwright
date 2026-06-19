class APIUtils {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async getToken() {

        // Login API para obtener el token

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: loginPayload
        });
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        token = loginResponseJson.token;
        console.log("Token:", token);
        return token;
    }

    async createOrder() {

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: {
                'Authorization': await this.getToken(),
                'Content-Type': 'application/json'
            }
        });
        const orderResponseJson = await orderResponse.json();
        console.log("Order Response:", orderResponseJson);
        orderID = orderResponseJson.orders[0];
        console.log("Order ID:", orderID);
        return orderID;
    }

}