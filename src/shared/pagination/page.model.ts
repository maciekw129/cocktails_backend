import { PageOptionsDto } from './PageOptionsDto';

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
