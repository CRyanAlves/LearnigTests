import { areIntervalsOverlapping } from "date-fns";
import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/AppointmentRepository";

interface CreateAppointmentRequest {
  customer: string;
  startAt: Date;
  endAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentsRepository: AppointmentsRepository) {}
  async execute({
    customer,
    startAt,
    endAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overLappingAppointment =
      await this.appointmentsRepository.findOverlappingAppointment(
        startAt,
        endAt
      );

    if (overLappingAppointment) {
      throw new Error("Another appointment overlaps this appointment dates");
    }
    
    const appointment = new Appointment({ customer, startAt, endAt });

    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}
