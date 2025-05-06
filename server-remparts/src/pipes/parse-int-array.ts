import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ParseIntPipeOptions,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntArray implements PipeTransform<string, number[]> {
  constructor(private readonly options: ParseIntPipeOptions) {}

  transform(value: string, metadata: ArgumentMetadata): number[] {
    const { optional = false } = this.options;

    if (optional && (value === undefined || value === null || value === '')) {
      return [];
    }

    if (!optional && !value) {
      throw new BadRequestException('Validation failed');
    }

    if (Array.isArray(value)) {
      const result: number[] = [];
      for (const val of value) {
        if (isNaN(+val)) {
          throw new BadRequestException('Validation failed');
        }

        result.push(+val);
      }

      return result;
    }

    if (isNaN(+value)) {
      throw new BadRequestException('Validation failed');
    }

    return [+value];
  }
}
