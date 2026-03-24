import { request, expect } from "@playwright/test";

export async function registerUser(email: string, password: string) {
  const createRequestContext = await request.newContext();
  const apiUrl = process.env.API_URL;
  const response = await createRequestContext.post(apiUrl + "/users/register", {
    data: {
      first_name: "Minh",
      last_name: "Cao",
      dob: "1990-07-30",
      phone: "0909975200",
      email: email,
      password: password,
      address: {
        street: "Ton That Thuyet",
        city: "HoChiMinh",
        state: "Saigon",
        country: "VN",
        postal_code: "70000",
      },
    },
  });

  if (!response.ok()) {
    console.error("Registration failed:", await response.json());
  }
  expect(response.status()).toBe(201);
  return response.status();
}
