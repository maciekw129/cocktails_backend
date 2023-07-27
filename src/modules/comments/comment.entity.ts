import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cocktail } from '../cocktails/cocktail.entity';
import { User } from '../users/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  date: Date;

  @ManyToOne(() => Cocktail, (cocktail) => cocktail.comments)
  cocktail: Cocktail;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;
}
