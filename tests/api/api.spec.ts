import { test, expect } from "@playwright/test";

test.describe("API tests", () => {
  const apiUrl = "https://api.practicesoftwaretesting.com";
  test("POST/api/login", async ({ request }) => {
    const postResponse = await request.post(apiUrl + "/users/login", {
      data: {
        email: "admin@practicesoftwaretesting.com",
        password: "welcome01",
      },
    });
    expect(postResponse.status()).toBe(200);
    const body = await postResponse.json();
    expect(body.access_token).toBeTruthy();
  });

  test("GET/api/products", async ({ request }) => {
    const getResponse = await request.get(apiUrl + "/products");
    expect(getResponse.status()).toBe(200);
    const body = await getResponse.json();
    expect(body.data.length).toBe(9);
    expect(body.total).toBe(50);
  });

  test("GET/products/{id}", async ({ request }) => {
    const apiUrl = "https://api.practicesoftwaretesting.com";
    const getProductResponse = await request.get(
      apiUrl + "/products/search?q=thor%20hammer",
    );
    expect(getProductResponse.status()).toBe(200);
    const productBody = await getProductResponse.json();
    const productId = productBody.data[0].id;
    
    const response = await request.get(apiUrl + `/products/${productId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.in_stock).toBe(true);
    expect(body.name).toBe("Thor Hammer");
    expect(body.price).toBe(11.14);
  })
});
