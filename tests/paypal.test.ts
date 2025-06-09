import { generateAccessToken } from "../lib/paypal";

test("generate access token from paypal", async () => {
  const accessToken = await generateAccessToken();
  console.log(accessToken);
  expect(accessToken).toBeDefined();
  expect(typeof accessToken).toBe("string");
  expect(accessToken.length).toBeGreaterThan(0);
});
