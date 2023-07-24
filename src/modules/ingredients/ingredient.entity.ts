import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IngredientItem } from '../cocktails/entities/ingredientItem.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isAlcoholic: boolean;

  @OneToMany(
    () => IngredientItem,
    (ingredientItem) => ingredientItem.ingredient,
  )
  ingredientItem: IngredientItem[];
}
