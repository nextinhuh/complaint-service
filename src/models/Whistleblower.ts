import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('whistleblowers')
class Whistleblower {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;
}

export default Whistleblower;
