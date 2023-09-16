import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IngredientItem } from './ingredientItem.entity';
import { PreparationStep } from '../../preparation-steps/preparation-step.entity';

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
    { cascade: true },
  )
  ingredientItem: IngredientItem[];

  @OneToMany(
    () => PreparationStep,
    (preparationStep) => preparationStep.ingredient,
  )
  preparationStep: PreparationStep[];
}
