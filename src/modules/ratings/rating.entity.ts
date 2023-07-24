import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cocktail: any;

  @Column()
  user: any;

  @Column()
  rate: number;
}
