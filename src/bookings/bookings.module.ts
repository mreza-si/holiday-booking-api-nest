import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { User } from '../users/user.entity';
import { Destination } from '../destinations/destination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Destination])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
