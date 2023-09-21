import { IsArray } from 'class-validator';
import { PageMetaDto } from './pageMetaDto';

export class PageDto<T> {
  @IsArray()
  readonly data: T[];

  readonly meta: PageMetaDto;

  constructor(data: T[], meta) {
    this.data = data;
    this.meta = meta;
  }
}
