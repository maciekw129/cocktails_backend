import { Module } from '@nestjs/common';
import { PreparationStepService } from './preparation-step.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreparationStep } from './preparation-step.entity';
import { IngredientsModule } from '../ingredients/ingredients.module';

@Module({
  imports: [TypeOrmModule.forFeature([PreparationStep]), IngredientsModule],
  providers: [PreparationStepService],
  exports: [PreparationStepService],
})
export class PreparationStepModule {}
