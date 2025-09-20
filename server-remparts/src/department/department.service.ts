import { Inject, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'nestjs-prisma';
import { createUrl } from '../lib/utils';
import { Department } from '@prisma/client';
import Redis from 'ioredis';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const maxOrder = await this.prisma.department.aggregate({
      _max: {
        order: true,
      },
    });

    const department = await this.prisma.department.create({
      data: {
        name: createDepartmentDto.name,
        url: createUrl(createDepartmentDto.name),
        order: maxOrder._max.order + 1,
      },
    });

    return department;
  }

  async getAll(includeCategories = true): Promise<{ data: Department[] }> {
    const redisKey = `departments-all`;

    const departmentsFromRedis = await this.redisClient.get(redisKey);

    if (departmentsFromRedis) return { data: JSON.parse(departmentsFromRedis) };

    const departments = await this.prisma.department.findMany({
      include: {
        category: includeCategories
          ? {
              orderBy: {
                name: 'asc',
              },
            }
          : false,
      },
    });

    await this.redisClient.setex(redisKey, 7 * 12 * 3600, JSON.stringify(departments));

    return { data: departments };
  }

  async getByUrl(departmentUrl: string, categories: boolean): Promise<{ data: Department }> {
    const redisKey = `departments-${departmentUrl}`;

    const departmentFromRedis = await this.redisClient.get(redisKey);

    if (departmentFromRedis) return { data: JSON.parse(departmentFromRedis) };

    const department = await this.prisma.department.findUnique({
      where: {
        url: departmentUrl,
      },
      include: {
        category: {
          orderBy: {
            name: 'asc',
          },
        },
      },
    });

    await this.redisClient.setex(redisKey, 7 * 12 * 3600, JSON.stringify(department));

    return { data: department };
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const { name, url } = updateDepartmentDto;

    const department = await this.prisma.department.update({
      where: {
        id,
      },
      data: {
        name,
        url: url || createUrl(name),
      },
    });

    return department;
  }

  async delete(id: number) {
    const departmentDeleted = await this.prisma.department.delete({
      where: {
        id,
      },
    });
    return departmentDeleted;
  }
}
