import { Module } from '@nestjs/common';
import { CocktailsService } from './cocktails.service';
import { CocktailsController } from './cocktails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { Cocktail } from './cocktail.entity';
import { IngredientItem } from '../ingredients/entities/ingredientItem.entity';
import { UsersModule } from '../users/users.module';
import { PreparationStepModule } from '../preparation-step/preparation-step.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cocktail, IngredientItem]),
    IngredientsModule,
    PreparationStepModule,
    UsersModule,
  ],
  controllers: [CocktailsController],
  providers: [CocktailsService],
})
export class CocktailsModule {}
