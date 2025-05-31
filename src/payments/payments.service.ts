import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../bookings/booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
  ) {}

  async checkout(bookingId: number, userId: number) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId, user: { id: userId } },
    });

    if (!booking) throw new NotFoundException('Booking not found for this user');

    
    return {
      message: 'پرداخت با موفقیت انجام شد ',
      amount: booking.destination.price * booking.numberOfPeople,
      booking: {
        id: booking.id,
        destination: booking.destination.name,
        people: booking.numberOfPeople,
        date: booking.travelDate,
      },
    };
  }
}
