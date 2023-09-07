import { Injectable } from '@nestjs/common';
import { PreparationStepDto } from '../cocktails/cocktails.model';
import { InjectRepository } from '@nestjs/typeorm';
import { PreparationStep } from './preparation-step.entity';
import { Repository } from 'typeorm';
import { IngredientsService } from '../ingredients/ingredients.service';

@Injectable()
export class PreparationStepService {
  constructor(
    @InjectRepository(PreparationStep)
    private preparationStepRepository: Repository<PreparationStep>,
    private ingredientsService: IngredientsService,
  ) {}

  public async generatePreparationSteps(preparation: PreparationStepDto[]) {
    const preparationStepArray: PreparationStep[] = [];

    for (const preparationStep of preparation) {
      const { action, tip } = preparationStep;
      const ingredient = await this.ingredientsService.findIngredientByName(
        preparationStep.ingredient,
      );

      const newPreparationStep = this.preparationStepRepository.create({
        ingredient,
        action,
        tip,
      });

      await this.preparationStepRepository.save(newPreparationStep);
      preparationStepArray.push(newPreparationStep);
    }

    return preparationStepArray;
  }
}
