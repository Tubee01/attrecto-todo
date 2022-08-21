import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @MinLength(0)
  @MaxLength(255)
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsOptional()
  @IsBoolean()
  admin?: boolean;
}
