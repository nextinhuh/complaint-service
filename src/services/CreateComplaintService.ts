/* eslint-disable no-throw-literal */
import { getCustomRepository } from 'typeorm';

import Complaint from '../models/Complaint';
import Whistleblower from '../models/Whistleblower';
import ComplaintsRepository from '../repositories/ComplaintRepository';
import AddressRepository from '../repositories/AddressRepository';
import WhistleblowerRepository from '../repositories/WhistleblowerRepository';
import api from './api';

interface RequestDTO {
  latitude: string;
  longitude: string;
  whistleblower: Whistleblower;
  complaint: Complaint;
}

interface ComplaintResponse {
  id: string;
  latitude: string;
  longitude: string;
  complaint: {
    title: string;
    description: string;
  };
  address: {
    cep: string;
    city: string;
    country: string;
    neighborhood: string;
    state: string;
    street: string;
  };
  whistleblower: {
    name: string;
    cpf: string;
  };
}

class CreateComplaintService {
  public async execute({
    complaint,
    latitude,
    longitude,
    whistleblower,
  }: RequestDTO): Promise<ComplaintResponse> {
    const complaintsRepository = getCustomRepository(ComplaintsRepository);
    const addressRepository = getCustomRepository(AddressRepository);
    const whistleblowerRepository = getCustomRepository(
      WhistleblowerRepository,
    );

    const getAddressWhitApi = await api.get('/reverse', {
      params: {
        key: 'zGOdhsO4CkiJG7d7pNG9ndRB1cTE0hnB',
        location: `${latitude},${longitude}`,
      },
    });

    const { locations } = getAddressWhitApi.data.results[0];

    if (
      locations[0].adminArea3 === '' ||
      locations[0].adminArea5 === '' ||
      locations[0].adminArea1 === ''
    ) {
      throw {
        message: 'The address is not found for this location.',
        code: '02',
      };
    }

    const createdWhistleblower = whistleblowerRepository.create({
      cpf: whistleblower.cpf,
      name: whistleblower.name,
    });

    await whistleblowerRepository.save(createdWhistleblower);

    const createdAddress = addressRepository.create({
      cep: locations[0].postalCode,
      city: locations[0].adminArea5,
      country: locations[0].adminArea1,
      neighborhood: locations[0].adminArea6,
      state: locations[0].adminArea3,
      street: locations[0].street,
    });

    await addressRepository.save(createdAddress);

    const createdComplaint = complaintsRepository.create({
      address_id: createdAddress.id,
      description: complaint.description,
      title: complaint.title,
      whistleblower_id: createdWhistleblower.id,
    });

    await complaintsRepository.save(createdComplaint);

    const complainResponse: ComplaintResponse = {
      id: createdWhistleblower.id,
      latitude,
      longitude,
      whistleblower: {
        name: createdWhistleblower.name,
        cpf: createdWhistleblower.cpf,
      },
      complaint: {
        title: createdComplaint.title,
        description: createdComplaint.description,
      },
      address: {
        street: createdAddress.street,
        neighborhood: createdAddress.neighborhood,
        city: createdAddress.city,
        state: createdAddress.state,
        country: createdAddress.country,
        cep: createdAddress.cep,
      },
    };

    return complainResponse;
  }
}

export default CreateComplaintService;
