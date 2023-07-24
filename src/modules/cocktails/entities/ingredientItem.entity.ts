import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IngredientItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cocktail: any;

  @Column()
  ingredient: any;

  @Column()
  unit: string;

  @Column()
  quantity: number;
}
