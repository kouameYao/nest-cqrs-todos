import { Todo } from '../entities/todo.entity';
import { TodoStatus } from '../../application/dto/status';

export interface TodoRepositoryInterface {
  findAll(status: TodoStatus): Promise<Todo[]>;
  findOne(id: number): Promise<Todo>;
  create(todoData: Partial<Todo>): Promise<Todo>;
  update(id: number, todoData: Partial<Todo>): Promise<Todo>;
  delete(id: number): Promise<void>;
}
