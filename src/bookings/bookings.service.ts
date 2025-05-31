import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Repository } from 'typeorm';
import { Destination } from '../destinations/destination.entity';
import { User } from '../users/user.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,

    @InjectRepository(Destination)
    private destinationRepo: Repository<Destination>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createBooking(userId: number, dto: any) {
    const destination = await this.destinationRepo.findOne({
      where: { id: dto.destinationId },
    });
    if (!destination) throw new NotFoundException('Destination not found');

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const booking = new Booking();
    booking.destination = destination;
    booking.user = user;
    booking.travelDate = dto.travelDate;
    booking.numberOfPeople = dto.numberOfPeople;

    return this.bookingRepo.save(booking);
  }
  async getBookingsForUser(userId: number) {
    return this.bookingRepo.find({
      where: { user: { id: userId } },
    });
  }
}
