import { Todo } from '../entities/todo.entity';
import { ETodoStatus } from '../../application/dto/todo-status.enum';

export interface TodoRepositoryInterface {
  findAll(status: ETodoStatus): Promise<Todo[]>;
  findOne(id: number): Promise<Todo>;
  create(todoData: Partial<Todo>): Promise<Todo>;
  update(id: number, todoData: Partial<Todo>): Promise<Todo>;
  delete(id: number): Promise<void>;
}
