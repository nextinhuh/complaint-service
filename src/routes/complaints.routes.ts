/* eslint-disable no-throw-literal */
import { Router } from 'express';
import * as yup from 'yup';

import CreateComplaintService from '../services/CreateComplaintService';

const complaintsRouter = Router();

const schema = yup.object().shape({
  latitude: yup.number().required('Latitude argument is missing.'),
  longitude: yup.number().required('Longitude argument is missing.'),
  complaint: yup
    .object({
      title: yup.string().required('Title argument of complaint is missing.'),
      description: yup
        .string()
        .required('Description argument of complaint is missing.'),
    })
    .required('Longitude argument is missing.'),
  whistleblower: yup.object({
    name: yup.string().required('Name argument of whistleblower is missing.'),
    cpf: yup.string().required('CPF argument of whistleblower is missing.'),
  }),
});

complaintsRouter.post('/', async (request, response) => {
  try {
    const { latitude, longitude, whistleblower, complaint } = request.body;

    await schema.validate(request.body).catch(err => {
      throw {
        message: err.errors,
        code: '01',
      };
    });

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
