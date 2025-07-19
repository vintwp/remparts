import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { GetCityDto } from './dto/get-city.dto';
import { GetWarehouseDto } from './dto/get-warehouse.dto';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly geoService: ShippingService) {}

  @Post('city')
  @HttpCode(HttpStatus.OK)
  async getCity(@Body() dto: GetCityDto) {
    return this.geoService.getCity(dto);
  }

  @Post('warehouse')
  @HttpCode(HttpStatus.OK)
  async getWarehouse(@Body() dto: GetWarehouseDto) {
    return this.geoService.getWarehouse(dto);
  }
}
