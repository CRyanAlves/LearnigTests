import { Appointment } from "../entities/appointment";

interface CreateAppointmentRequest {
  customer: string;
  startAt: Date;
  endAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  async execute({
    customer,
    startAt,
    endAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const appointment = new Appointment({ customer, startAt, endAt });

    return appointment;
  }
}
