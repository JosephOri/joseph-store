import { generateAccessToken, paypal } from "../lib/paypal";

test("generate access token from paypal", async () => {
  const accessToken = await generateAccessToken();
  console.log(accessToken);
  expect(accessToken).toBeDefined();
  expect(typeof accessToken).toBe("string");
  expect(accessToken.length).toBeGreaterThan(0);
});

test("create order from paypal", async () => {
  const accessToken = await generateAccessToken();
  const price = 10.0;

  const order = await paypal.createOrder(price);
  console.log(order);
  expect(order).toHaveProperty("id");
  expect(order).toHaveProperty("status");
  expect(order.status).toBe("CREATED");
});

test("simulate capturing payment from paypal", async () => {
  const orderId = "100";

  const mockCapturePayment = jest
    .spyOn(paypal, "capturePayment")
    .mockResolvedValue({
      status: "COMPLETED",
    });

  const captureResponse = await paypal.capturePayment(orderId);
  console.log(captureResponse);
  expect(captureResponse).toHaveProperty("status");
  expect(captureResponse.status).toBe("COMPLETED");

  mockCapturePayment.mockRestore();
});
