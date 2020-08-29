import { EntityRepository, Repository } from 'typeorm';

import Address from '../models/Address';

@EntityRepository(Address)
class AddresRepository extends Repository<Address> {}

export default AddresRepository;
