import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Cocktail } from '../cocktails/cocktail.entity';
import { Comment } from '../comments/comment.entity';
import { Rating } from '../ratings/rating.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  hashedRt?: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Cocktail, (cocktail) => cocktail.author)
  cocktails: Cocktail[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];
}
