import { IsIn, IsOptional } from 'class-validator';

export class GetTodosFilterDto {
  @IsOptional()
  @IsIn(['completed', 'in-progress', 'to-do', 'all'])
  status?: string;
}
