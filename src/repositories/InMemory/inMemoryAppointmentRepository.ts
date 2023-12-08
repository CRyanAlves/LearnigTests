import { areIntervalsOverlapping } from "date-fns";
import { Appointment } from "../../entities/appointment";
import { AppointmentsRepository } from "./../AppointmentRepository";
export class inMemoryAppointmentRepository implements AppointmentsRepository {
  public items: Appointment[] = [];
  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }
  findOverlappingAppointment(
    startAt: Date,
    endAt: Date
  ): Promise<Appointment | null> {
    const overLappingAppointment = this.items.find((appointment) => {
      return areIntervalsOverlapping(
        {
          start: startAt,
          end: endAt,
        },
        {
          start: appointment.startAt,
          end: appointment.endAt,
        },
        {
          inclusive: true,
        }
      );
    });
    if (overLappingAppointment) {
      return Promise.resolve(overLappingAppointment);
    } else {
      return Promise.resolve(null);
    }
  }
}
