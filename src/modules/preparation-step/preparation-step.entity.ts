import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { Cocktail } from '../cocktails/cocktail.entity';

@Entity()
export class PreparationStep {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.preparationStep)
  ingredient: Ingredient;

  @Column()
  action: string;

  @Column()
  tip: string;

  @ManyToOne(() => Cocktail, (cocktail) => cocktail.preparation)
  cocktail: Cocktail;
}
