import { request, expect } from "@playwright/test";
import * as fs from "fs";

export async function createMessage(
  name: string,
  message: string,
  subject: string,
  authFilePath: string,
) {
  const storageData = JSON.parse(fs.readFileSync(authFilePath, "utf-8"));
  const token = storageData.origins[0].localStorage.find(
    (item) => item.name === "auth-token",
  ).value;

  const apiURL = process.env.API_URL;
  const createRequestContext = await request.newContext();
  const response = await createRequestContext.post(apiURL + "/messages", {
    data: {
      name: name,
      message: message,
      subject: subject,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  expect(response.status()).toBe(200);
  return await response.json();
}
