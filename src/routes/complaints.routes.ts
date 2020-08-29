import { Router } from 'express';

import CreateComplaintService from '../services/CreateComplaintService';

const complaintsRouter = Router();

complaintsRouter.post('/', async (request, response) => {
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

export default complaintsRouter;
