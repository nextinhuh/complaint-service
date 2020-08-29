import { EntityRepository, Repository } from 'typeorm';

import Whistleblower from '../models/Whistleblower';

@EntityRepository(Whistleblower)
class WhistleblowerRepository extends Repository<Whistleblower> {}

export default WhistleblowerRepository;
