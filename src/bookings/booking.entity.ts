import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Destination } from '../destinations/destination.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  travelDate: string;

  @Column()
  numberOfPeople: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user: User;

  @ManyToOne(() => Destination, (dest) => dest.id, { eager: true })
  destination: Destination;
}
