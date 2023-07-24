import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cocktail: any;

  @Column()
  author: any;

  @Column()
  content: string;

  @Column()
  date: Date;
}
