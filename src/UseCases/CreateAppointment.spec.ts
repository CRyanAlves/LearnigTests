import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./CreateAppointment";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../tests/utils/GetFutureDate";

describe("CreateAppointment", () => {
  it("should be able to create an appointment", () => {
    const createAppointment = new CreateAppointment();
    const startAt = getFutureDate(`${new Date().getFullYear()}-12-06`);
    const endAt = getFutureDate(`${new Date().getFullYear()}-12-07`);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startAt,
        endAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
});
