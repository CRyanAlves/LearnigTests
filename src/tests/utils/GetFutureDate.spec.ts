import { expect, test } from "vitest";
import { getFutureDate } from "./GetFutureDate";

test("Incress date with one year", () => {
  const year = new Date().getFullYear();

  expect(getFutureDate(`${year}-08-26`).getFullYear()).toEqual(2024);
})