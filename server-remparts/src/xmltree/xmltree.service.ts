import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { XMLParser } from 'fast-xml-parser';
import * as fs from 'fs';
import * as path from 'path';
import { XmlFromServer, DataFromServer } from './types';

@Injectable()
export class XmltreeService {
  constructor(private readonly httpService: HttpService) {}

  async getXML(): Promise<DataFromServer> {
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
