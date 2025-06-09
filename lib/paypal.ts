const base = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com";

const clientId = process.env.PAYPAL_CLIENT_ID;
const appSecret = process.env.PAYPAL_APP_SECRET;

export const paypal = {};

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
  if (response.ok) {
    const data = await response.json();
    return data.access_token;
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
