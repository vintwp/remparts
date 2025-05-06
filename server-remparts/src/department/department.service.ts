import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'nestjs-prisma';
import { createUrl } from '../lib';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

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

  async getAll(includeCategories?: boolean) {
    const department = await this.prisma.department.findMany({
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

    return department;
  }

  async getByUrl(departmentUrl: string, categories: boolean) {
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

    return department;
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
