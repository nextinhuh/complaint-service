/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-var-requires */
import Supertest from 'supertest';

const request = Supertest('http://localhost:3000/v1/denuncias');

describe('Create a new complaint missing any arguments', () => {
  it('Should recive status error number 400 and message, when create a new complaint whitout an complaint', async () => {
    const complaint = {
      title: '',
      description: '',
    };
    const whistleblower = {
      name: 'José',
      cpf: '06835346450',
    };

    const latitude = 42.4648183;
    const longitude = -71.010051;

    return request
      .post('/')
      .send({
        complaint,
        whistleblower,
        latitude,
        longitude,
      })
      .expect(400, {
        error: {
          message: 'The complaint is missing.',
          code: '03',
        },
      });
  });

  it('Should recive status error number 400 and message, when create a new complaint whitout an whitleblower', async () => {
    const complaint = {
      title: 'Esgoto a céu aberto',
      description: 'Existe um esgoto a céu aberto.',
    };
    const whistleblower = {
      name: '',
      cpf: '',
    };

    const latitude = 42.4648183;
    const longitude = -71.010051;

    return request
      .post('/')
      .send({
        complaint,
        whistleblower,
        latitude,
        longitude,
      })
      .expect(400, {
        error: {
          message: 'The whistleblower is missing.',
          code: '01',
        },
      });
  });

  it('Should recive status error number 400 and message, when create a new complaint whitout an latitue/longitude', async () => {
    const complaint = {
      title: 'Esgoto a céu aberto',
      description: 'Existe um esgoto a céu aberto.',
    };
    const whistleblower = {
      name: 'José',
      cpf: '06835346450',
    };

    const latitude = 0;
    const longitude = 0;

    return request
      .post('/')
      .send({
        complaint,
        whistleblower,
        latitude,
        longitude,
      })
      .expect(400, {
        error: {
          message: 'The address is not found for this location.',
          code: '02',
        },
      });
  });

  it('Should recive status error number 400 and message, when create a new complaint missing any argument', async () => {
    const complaint = {
      title: 'Esgoto a céu aberto',
      description: 'Existe um esgoto a céu aberto.',
    };
    const whistleblower = {
      name: 'José',
      cpf: '06835346450',
    };

    const latitude = 0;
    const longitude = 0;

    return request
      .post('/')
      .send({
        complaint,
        latitude,
      })
      .expect(400, {
        error: {
          message: 'This request is invalid.',
          code: '04',
        },
      });
  });
});

describe('Create a new complaint', () => {
  it('Should recive status code 200 when create a new complaint', async () => {
    const complaint = {
      title: 'Esgoto a céu aberto',
      description: 'Existe um esgoto a céu aberto.',
    };
    const whistleblower = {
      name: 'José',
      cpf: '06835346450',
    };

    const latitude = 42.4648183;
    const longitude = -71.010051;

    return request
      .post('/')
      .send({
        complaint,
        whistleblower,
        latitude,
        longitude,
      })
      .expect(200);
  });
});
