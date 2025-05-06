import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get()
  getAll() {
    return this.itemService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.itemService.getById(+id);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.updateById(+id, updateItemDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.itemService.deleteById(+id);
  }
}
