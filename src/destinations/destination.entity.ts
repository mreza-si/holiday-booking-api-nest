import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Destination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column('decimal')
  price: number;

  @Column('float', { default: 0 })
  rating: number;

  @Column({ nullable: true })
  description: string;
}
