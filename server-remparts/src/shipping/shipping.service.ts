import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetCityDto } from './dto/get-city.dto';
import { messagesFromServer } from 'src/config/messagesFromServer';
import { GetWarehouseDto } from './dto/get-warehouse.dto';
import { NovaPoshtaWarehouse, NovaPoshtaWarehouseResponse } from './types/warehouse';
import { NovaPoshtaResponse, NovaPoshtaResponseExtended } from './types/Response';
import Redis from 'ioredis';
import { GetCity } from './types/GetCity';
import { GetAreas } from './types/GetAreas';
import { SearchSettlements } from './types/SearchSettlements';
import { isExtendedNovaPoshtaResponse } from './lib/isExtendedNovaPoshtaResponse';

@Injectable()
export class ShippingService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  private async handleResponse<T>(response: Response): Promise<T[]> {
    if (!response.ok) {
      throw new InternalServerErrorException(messagesFromServer.general.internalServerError.ua);
    }

    const rawData = (await response.json()) as
      | NovaPoshtaResponse<T>
      | NovaPoshtaResponseExtended<T>;

    if (rawData.success === false) {
      throw new InternalServerErrorException(messagesFromServer.general.internalServerError.ua);
    }

    if (rawData.data.length === 0) {
      throw new NotFoundException(messagesFromServer.geo.areaNotFound.ua);
    }

    // check specific response body for searchSettlement method
    let data: T[];

    if (isExtendedNovaPoshtaResponse(rawData)) {
      data = rawData.data[0].Addresses;
    } else {
      data = rawData.data;
    }

    if (!data || data.length === 0) {
      throw new NotFoundException(messagesFromServer.geo.areaNotFound.ua);
    }

    return data;
  }

  private async getAreas(): Promise<
    Array<{ id: string; areaCenterId: string; Description: string }>
  > {
    const response = await fetch(this.configService.getOrThrow<string>('NOVA_POSHTA_API_URL'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: this.configService.getOrThrow<string>('NOVA_POSHTA_API_KEY'),
        modelName: 'AddressGeneral',
        calledMethod: 'getAreas',
        methodProperties: {},
      }),
    });

    const areasFromServer = await this.handleResponse<GetAreas>(response);

    const areasToReturn = areasFromServer.map(area => {
      return {
        id: area.Ref,
        areaCenterId: area.AreasCenter,
        Description: `${area.Description} обл.`,
      };
    });

    return areasToReturn;
  }

  private async getAreaCenters() {
    const redisKey = 'main-cities';

    const mainCitiesFromRedis = await this.redisClient.get(redisKey);

    if (mainCitiesFromRedis) return JSON.parse(mainCitiesFromRedis);

    const areas = await this.getAreas();

    const areasCentersFromServerPromises = await Promise.all(
      areas.map(area => {
        return fetch(this.configService.getOrThrow<string>('NOVA_POSHTA_API_URL'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            apiKey: this.configService.getOrThrow<string>('NOVA_POSHTA_API_KEY'),
            modelName: 'AddressGeneral',
            calledMethod: 'getCities',
            methodProperties: {
              Ref: area.areaCenterId,
            },
          }),
        });
      }),
    );

    const areasCentersFromServer = await Promise.all(
      areasCentersFromServerPromises.map(async res => {
        try {
          const response = await this.handleResponse<GetCity>(res);
          const { Ref, Description, AreaDescription } = response[0];

          const city = {
            id: Ref,
            name: `м. ${Description}, ${AreaDescription} обл.`,
          };

          return city;
        } catch (error) {
          return null;
        }
      }),
    );

    const sortedAreasCenters = areasCentersFromServer
      .filter(city => city !== null)
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

    await this.redisClient.setex(redisKey, 60 * 60 * 24 * 7, JSON.stringify(sortedAreasCenters));

    return sortedAreasCenters;
  }

  async getCity(dto: GetCityDto) {
    if (!dto.name) {
      return {
        data: await this.getAreaCenters(),
      };
    }

    const response = await fetch(this.configService.getOrThrow<string>('NOVA_POSHTA_API_URL'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: this.configService.getOrThrow<string>('NOVA_POSHTA_API_KEY'),
        modelName: 'AddressGeneral',
        calledMethod: 'searchSettlements',
        methodProperties: {
          Page: '1',
          CityName: dto.name,
          Limit: 4,
        },
      }),
    });

    const dataFromServer = await this.handleResponse<SearchSettlements>(response);

    const citiesToResponse = dataFromServer.map(city => ({
      id: city['DeliveryCity'],
      name: city['Present'],
    }));

    return {
      data: citiesToResponse,
    };
  }

  async getWarehouse(dto: GetWarehouseDto) {
    const response = await fetch(this.configService.getOrThrow<string>('NOVA_POSHTA_API_URL'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: this.configService.getOrThrow<string>('NOVA_POSHTA_API_KEY'),
        modelName: 'AddressGeneral',
        calledMethod: 'getWarehouses',
        methodProperties: {
          CityRef: dto.cityId,
          FindByString: dto.warehouseName,
          Limit: 100,
        },
      }),
    });

    if (!response.ok) {
      throw new InternalServerErrorException(messagesFromServer.general.internalServerError.ua);
    }

    const dataFromServer = await this.handleResponse<NovaPoshtaWarehouse>(response);

    const warehousesToResponse = dataFromServer.map(warehouse => {
      return {
        id: warehouse['Ref'],
        name: `${warehouse['Description']}`,
      };
    });

    return {
      data: warehousesToResponse,
    };
  }
}
