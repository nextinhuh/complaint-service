/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import Address from './Address';
import Whistleblower from './Whistleblower';

@Entity('complaints')
class Complaint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  whistleblower_id: string;

  @Column()
  address_id: string;

  @ManyToOne(() => Whistleblower)
  @JoinColumn({ name: 'whistleblower_id' })
  whistleblower: Whistleblower;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;
}

export default Complaint;
