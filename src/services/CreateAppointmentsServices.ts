import { startOfHour } from 'date-fns';
import Appointment from '../model/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentsServices {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmnetsInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmnetsInSameDate) {
      throw Error('Esse Horário não está disponivel.');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentsServices;
