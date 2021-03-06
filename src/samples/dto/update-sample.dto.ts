import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSampleDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(['public', 'followers'])
  @ApiPropertyOptional()
  visibility?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  license?: string;
}
