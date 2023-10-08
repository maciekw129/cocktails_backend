import { PreparationStep } from './preparation-step.entity';
import {PreparationStepDto} from "./dto/preparationStepDto";

export class PreparaionStepsMappers {
  public static mapPreparationStepToPreparationStepDto(
    preparationStep: PreparationStep,
  ): PreparationStepDto {
    return {
      step: preparationStep.step,
      ingredient: preparationStep.ingredient?.name,
      action: preparationStep.action,
      tip: preparationStep.tip,
    };
  }
}
