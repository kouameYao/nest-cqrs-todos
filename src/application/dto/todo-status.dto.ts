import { IsEnum, IsOptional } from 'class-validator';
import { ETodoStatus } from './todo-status.enum';

export class GetTodosFilterDto {
  @IsOptional()
  @IsEnum(ETodoStatus, {
    message: 'Le status doit être soit completed, in-progress, to-do ou all',
  })
  status?: ETodoStatus;
}
