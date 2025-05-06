import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { catchError, firstValueFrom } from 'rxjs';
import { XmlFromServer, XmlPrice } from './price.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PriceService {
  constructor(private readonly httpService: HttpService) {}

  // getXML(): Observable<AxiosResponse<string>> {
  //   const data = this.httpService.get(
  //     'https://jsonplaceholder.typicode.com/todos/1',
  //   );
  //   return data;
  // }

  async getXML(): Promise<XmlPrice> {
    // const { data } = await firstValueFrom(
    //   this.httpService
    //     .get<
    //       Buffer<ArrayBufferLike>
    //     >('https://afm.com.ua/price-public/afm.com.ua-all-usd-uk-ua.xml')
    //     .pipe(
    //       catchError((error: AxiosError) => {
    //         throw 'An error happened!';
    //       }),
    //     ),
    // );

    const filePath = path.join(`${process.cwd()}/src/asset`, 'price.xml');
    const xmlData = fs.readFileSync(filePath);
    console.log(filePath);

    const parser = new XMLParser({
      textNodeName: 'value',
      allowBooleanAttributes: true,
      parseTagValue: true,
      ignoreAttributes: false,
      attributeNamePrefix: '',
    });

    const res = parser.parse(xmlData, true) as XmlFromServer;

    const data = {
      categories: res.yml_catalog.shop.categories.category,
      offers: res.yml_catalog.shop.offers.offer,
    };

    return data;
  }
}
