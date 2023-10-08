import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class PatchUserDto {
  @IsString()
  @IsNotEmpty({message: "First name can't be empty."})
  @MaxLength(255)
  firstName: string;

  @IsString()
  @IsNotEmpty({message: "Last name can't be empty."})
  @MaxLength(255)
  lastName: string;
}
