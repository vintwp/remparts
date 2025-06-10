import {
  Controller,
  Get,
  HttpStatus,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { SearchService } from './search.service';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt-auth.guard';
import { TJwtUser } from 'src/types';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  search(
    @Query('query') query: string,
    @Query(
      'category',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        optional: true,
      }),
    )
    category: number,
    @Query(
      'page',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        optional: true,
      }),
    )
    page: number,
    @Query(
      'perPage',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        optional: true,
      }),
    )
    perPage: number,
    @Query(
      'stock',
      new ParseBoolPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        optional: true,
      }),
    )
    stock: boolean,
    @Query('sortBy')
    sortBy: string,
    @Req() req: Request,
  ) {
    const user = req.user || null;
    const customerPriceTier = user ? (user as TJwtUser).customerPriceTier : 'RETAIL';

    return this.searchService.search(
      query,
      category,
      page,
      perPage,
      stock,
      sortBy,
      customerPriceTier,
    );
  }
}
