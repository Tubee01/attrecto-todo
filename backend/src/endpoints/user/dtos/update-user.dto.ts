import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsUUID,
} from 'class-validator';
export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(255)
  name: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsOptional()
  @IsNotEmpty()
  password: string;
  @IsOptional()
  @IsBoolean()
  admin?: boolean;
  @IsOptional()
  @IsUUID()
  profile_image_file_id?: string;
}
