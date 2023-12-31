import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PreparationStep } from './preparation-step.entity';
import { Repository } from 'typeorm';
import { IngredientsService } from '../ingredients/ingredients.service';
import {PreparationStepDto} from "./dto/preparationStepDto";

@Injectable()
export class PreparationStepsService {
  constructor(
    @InjectRepository(PreparationStep)
    private preparationStepRepository: Repository<PreparationStep>,
    private ingredientsService: IngredientsService,
  ) {}

  public async generatePreparationSteps(preparation: PreparationStepDto[]) {
    const preparationStepArray: PreparationStep[] = [];

    for (const preparationStep of preparation) {
      const { step, action, tip } = preparationStep;
      const ingredient = await this.ingredientsService.findIngredientByName(
        preparationStep.ingredient,
      );

      const newPreparationStep = this.preparationStepRepository.create({
        step,
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
