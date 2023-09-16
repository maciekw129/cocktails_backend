import { Module } from '@nestjs/common';
import { PreparationStepsService } from './preparation-steps.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreparationStep } from './preparation-step.entity';
import { IngredientsModule } from '../ingredients/ingredients.module';

@Module({
  imports: [TypeOrmModule.forFeature([PreparationStep]), IngredientsModule],
  providers: [PreparationStepsService],
  exports: [PreparationStepsService],
})
export class PreparationStepsModule {}
