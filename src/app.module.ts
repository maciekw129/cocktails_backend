import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CocktailsModule } from './modules/cocktails/cocktails.module';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/user.entity';
import { CommentsModule } from './modules/comments/comments.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { Cocktail } from './modules/cocktails/cocktail.entity';
import { Comment } from './modules/comments/comment.entity';
import { Rating } from './modules/ratings/rating.entity';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { Ingredient } from './modules/ingredients/entities/ingredient.entity';
import { IngredientItem } from './modules/ingredients/entities/ingredientItem.entity';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './auth/guards/at.guard';
import { APP_GUARD } from '@nestjs/core';
import { PreparationStepsModule } from './modules/preparation-steps/preparation-steps.module';
import { PreparationStep } from './modules/preparation-steps/preparation-step.entity';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        Cocktail,
        Comment,
        Rating,
        Ingredient,
        IngredientItem,
        PreparationStep,
      ],
      synchronize: true,
    }),
    UsersModule,
    CocktailsModule,
    CommentsModule,
    RatingsModule,
    IngredientsModule,
    PreparationStepsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
