import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IngredientItem } from './ingredientItem.entity';
import { User } from 'src/modules/users/user.entity';
import { Comment } from 'src/modules/comments/comment.entity';
import { Rating } from 'src/modules/ratings/rating.entity';

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

  @OneToMany(() => User, (user) => user.cocktails)
  author: User;

  @OneToMany(() => IngredientItem, (ingredientItem) => ingredientItem.cocktail)
  ingredientItem: IngredientItem[];

  @OneToMany(() => Comment, (comment) => comment.cocktail)
  comments: Comment[];

  @OneToMany(() => Rating, (rating) => rating.cocktail)
  ratings: Rating[];
}
