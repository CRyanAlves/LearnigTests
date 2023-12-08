import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./CreateAppointment";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../tests/utils/GetFutureDate";
import { inMemoryAppointmentRepository } from "../repositories/InMemory/inMemoryAppointmentRepository";

describe("CreateAppointment", () => {
  it("should be able to create an appointment", () => {
    const appointmentRepository = new inMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);
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

  it("should not be able to create an appointment with overlapping dates", async () => {
    const appointmentRepository = new inMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);
    const startAt = getFutureDate(`${new Date().getFullYear()}-12-06`);
    const endAt = getFutureDate(`${new Date().getFullYear()}-12-010`);
    await createAppointment.execute({
      customer: "John Doe",
      startAt,
      endAt,
    });

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startAt: getFutureDate(`${new Date().getFullYear()}-12-09`),
        endAt: getFutureDate(`${new Date().getFullYear()}-12-13`),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startAt: getFutureDate(`${new Date().getFullYear()}-12-05`),
        endAt: getFutureDate(`${new Date().getFullYear()}-12-08`),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startAt: getFutureDate(`${new Date().getFullYear()}-12-05`),
        endAt: getFutureDate(`${new Date().getFullYear()}-12-11`),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
