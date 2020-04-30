import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsServices from '../services/CreateAppointmentsServices';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    const parseDate = parseISO(date);
    const createAppointment = new CreateAppointmentsServices(
      appointmentsRepository,
    );
    const appointment = createAppointment.execute({
      provider,
      date: parseDate,
    });

    response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
export default appointmentsRouter;
