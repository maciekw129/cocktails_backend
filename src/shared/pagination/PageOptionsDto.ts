import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Order } from './page.model';

export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  constructor(page?: number, order?: Order) {
    if (page) this.page = page;
    if (order) this.order = order;
  }

  get skip() {
    return (this.page - 1) * 10;
  }
}
