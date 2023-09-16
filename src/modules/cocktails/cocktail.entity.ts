import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { IngredientItem } from '../ingredients/entities/ingredientItem.entity';
import { User } from 'src/modules/users/user.entity';
import { Comment } from 'src/modules/comments/comment.entity';
import { Rating } from 'src/modules/ratings/rating.entity';
import { PreparationStep } from '../preparation-steps/preparation-step.entity';
import { Category, Difficulty } from './cocktails.model';

@Entity()
export class Cocktail {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  description: string;

  @Column()
  category: Category;

  @Column()
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
