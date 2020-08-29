import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { startOfHour, parseISO } from 'date-fns';

import api from '../services/api';
import ComplainRepository from '../repositories/ComplaintRepository';
import CreateComplaintService from '../services/CreateComplaintService';

// A rota deve se preocupar apenas em:
// Receber a requisição, chamar outro arquivo, devolver uma resposta

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const { latitude, longitude, whistleblower, complaint } = request.body;

  return response.json({ message: 'teste' });
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { latitude, longitude, whistleblower, complaint } = request.body;

    const createComplaintService = new CreateComplaintService();

    const newComplaint = await createComplaintService.execute({
      complaint,
      latitude,
      longitude,
      whistleblower,
    });

    return response.json(newComplaint);
  } catch (err) {
    return response
      .status(400)
      .json({ error: { message: err.message, code: err.code } });
  }
});

export default appointmentsRouter;
