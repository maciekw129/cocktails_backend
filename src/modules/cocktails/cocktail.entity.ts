import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { IngredientItem } from '../ingredients/entities/ingredientItem.entity';
import { PreparationStep } from '../preparation-steps/preparation-step.entity';
import { Category, Difficulty } from './cocktails.model';
import {User} from "../users/user.entity";
import {Comment} from "../comments/comment.entity";
import {Rating} from "../ratings/rating.entity";

@Entity()
export class Cocktail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 500 })
  imageUrl: string;

  @Column({ length: 5000 })
  description: string;

  @Column({type: 'varchar'})
  category: Category;

  @Column({type: 'varchar'})
  difficulty: Difficulty;

  @ManyToOne(() => User, (user) => user.cocktails)
  author: User;

  @OneToMany(
    () => IngredientItem,
    (ingredientItem) => ingredientItem.cocktail,
    { cascade: true },
  )
  ingredientItem: IngredientItem[];

  @OneToMany(
    () => PreparationStep,
    (preparationStep) => preparationStep.cocktail,
  )
  preparation: PreparationStep[];

  @OneToMany(() => Comment, (comment) => comment.cocktail)
  comments: Comment[];

  @OneToMany(() => Rating, (rating) => rating.cocktail)
  ratings: Rating[];

  @CreateDateColumn({
    precision: null,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDate: Date;
}
