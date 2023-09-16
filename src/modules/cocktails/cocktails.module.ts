import { Module } from '@nestjs/common';
import { CocktailsService } from './cocktails.service';
import { CocktailsController } from './cocktails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { Cocktail } from './cocktail.entity';
import { IngredientItem } from '../ingredients/entities/ingredientItem.entity';
import { UsersModule } from '../users/users.module';
import { PreparationStepsModule } from '../preparation-steps/preparation-steps.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cocktail, IngredientItem]),
    IngredientsModule,
    PreparationStepsModule,
    UsersModule,
  ],
  controllers: [CocktailsController],
  providers: [CocktailsService],
})
export class CocktailsModule {}
