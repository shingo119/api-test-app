import { IsInt, IsIn, Min, Max, IsString, Matches } from 'class-validator';

export class EstateQueryDto {
  @IsInt()
  @Min(2009)
  @Max(2021)
  year: number;

  @IsInt()
  @Min(1)
  @Max(47)
  prefCode: number;

  @IsString()
  @Matches(/^-|[0-9]+$/, {
    message: 'cityCode must be "-" or a number',
  })
  cityCode: string;

  @IsInt()
  @IsIn([1, 2, 3, 4, 5])
  displayType: number;
}
