import {
  Controller,
  Get,
  HttpStatus,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

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
  ) {
    return this.searchService.search(
      query,
      category,
      page,
      perPage,
      stock,
      sortBy,
    );
  }
}
