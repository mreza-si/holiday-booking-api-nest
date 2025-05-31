import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Destination } from './destination.entity';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destination)
    private repo: Repository<Destination>,
  ) {}

  async create(data: Partial<Destination>) {
    const dest = this.repo.create(data);
    return this.repo.save(dest);
  }

  async findAll(query: any) {
    const where: any = {};
    if (query.location) where.location = Like(`%${query.location}%`);
    if (query.price) where.price = LessThanOrEqual(Number(query.price));
    if (query.rating) where.rating = MoreThanOrEqual(Number(query.rating));
    return this.repo.find({ where });
  }

  async findOne(id: number) {
    const dest = await this.repo.findOne({ where: { id } });
    if (!dest) throw new NotFoundException('Destination not found');
    return dest;
  }

  async update(id: number, data: Partial<Destination>) {
    const dest = await this.findOne(id);
    Object.assign(dest, data);
    return this.repo.save(dest);
  }

  async remove(id: number) {
    const dest = await this.findOne(id);
    return this.repo.remove(dest);
  }
}
