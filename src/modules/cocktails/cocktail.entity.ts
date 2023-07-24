import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cocktail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  preparation: string;

  @Column()
  author: any;
}
