import {Action} from "../preparation-steps.model";
import {IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";

export class PreparationStepDto {
  @IsInt()
  @IsNotEmpty()
  step: number;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  ingredient: string;

  @IsEnum(Action)
  @IsNotEmpty()
  action: Action;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  tip: string;
}
