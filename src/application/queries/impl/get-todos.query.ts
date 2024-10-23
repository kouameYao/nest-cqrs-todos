import { TodoStatus } from '../../dto/todo-status.enum';

export class GetTodosQuery {
  constructor(public readonly status: TodoStatus) {}
}
