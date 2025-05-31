import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  // ایجاد رزرو برای کاربر لاگین شده
  @Post()
  createBooking(@Body() body: any, @Request() req: any) {
    return this.service.createBooking(req.user.userId, body);
  }

  //دریافت همه رزروهای کاربر لاگین شده
  @Get('me')
  getMyBookings(@Request() req: any) {
    return this.service.getBookingsForUser(req.user.userId);
  }
}
