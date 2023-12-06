import { expect, test } from "vitest";
import { Appointment } from "./appointment";
import { getFutureDate } from "../tests/utils/GetFutureDate";

test("Create an appointment", () => {
  const startAt = getFutureDate(`${new Date().getFullYear()}-06-12`);
  const endAt = getFutureDate(`${new Date().getFullYear()}-07-12`);

  const appointment = new Appointment({
    customer: "Jonh Doe",
    startAt,
    endAt,
  });
  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("Jonh Doe");
});

test("Cannot create an appointment with end date before start date", () => {
  const startAt = getFutureDate(`${new Date().getFullYear()}-06-12`);
  const endAt = getFutureDate(`${new Date().getFullYear()}-05-12`);

  expect(() => {
    return new Appointment({
      customer: "Jonh Doe",
      startAt,
      endAt,
    });
  }).toThrow();
});

test("Cannot create an appointment with start date before current date", () => {
  const startAt = new Date();
  const endAt = new Date();

  startAt.setDate(startAt.getDate() - 1);
  endAt.setDate(endAt.getDate() + 2);

  expect(() => {
    return new Appointment({
      customer: "Jonh Doe",
      startAt,
      endAt,
    });
  }).toThrow();
});
