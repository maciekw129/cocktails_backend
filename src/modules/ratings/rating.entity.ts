import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cocktail } from '../cocktails/cocktail.entity';
import { User } from '../users/user.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rate: number;

  @ManyToOne(() => Cocktail, (cocktail) => cocktail.ratings)
  cocktail: Cocktail;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;
}
