const base = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com";

const clientId = process.env.PAYPAL_CLIENT_ID;
const appSecret = process.env.PAYPAL_APP_SECRET;

export const paypal = {
  createOrder: async function createOrder(price: number) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: price,
            },
          },
        ],
      }),
    });

    const data = await handleResponse(response);
    return data;
  },
  capturePayment: async function capturePayment(orderId: string) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await handleResponse(response);
    return data;
  },
};

//generate access token
async function generateAccessToken() {
  const auth = Buffer.from(`${clientId}:${appSecret}`).toString("base64");
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const data = await handleResponse(response);
  return data.access_token;
}

async function handleResponse(response: Response) {
  if (response.ok) {
    return response.json();
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

export { generateAccessToken };
