import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BannerService {
  constructor(private readonly prisma: PrismaService) {}
  create(createBannerDto: CreateBannerDto) {
    return 'This action adds a new banner';
  }

  async getAll() {
    const banner = await this.prisma.banner.findMany();

    return banner;
  }

  async getById(id: number) {
    return `This action returns a #${id} banner`;
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    return `This action updates a #${id} banner`;
  }

  async delete(id: number) {
    return `This action removes a #${id} banner`;
  }
}
