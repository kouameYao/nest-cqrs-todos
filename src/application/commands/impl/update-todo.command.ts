import { TodoStatus } from '../../dto/todo-status.enum';
import { CreateTodoCommand } from './create-todo.command';

export class UpdateTodoCommand extends CreateTodoCommand {
  constructor(
    public readonly id: number,
    public readonly status: TodoStatus,
    title: string,
    description: string,
  ) {
    super(title, description);
  }
}
