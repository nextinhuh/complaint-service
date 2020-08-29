import { Router } from 'express';
import complaintRouter from './complaints.routes';

const routes = Router();

routes.use('/v1/denuncias', complaintRouter);

export default routes;
