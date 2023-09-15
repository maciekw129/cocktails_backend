import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { Cocktail } from '../cocktails/cocktail.entity';
import { Action } from './preparation-step.model';

@Entity()
export class PreparationStep {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  step: number;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.preparationStep)
  ingredient: Ingredient;

  @Column()
  action: Action;

  @Column()
  tip: string;

  @ManyToOne(() => Cocktail, (cocktail) => cocktail.preparation)
  cocktail: Cocktail;
}
