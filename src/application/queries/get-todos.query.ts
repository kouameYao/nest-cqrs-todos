import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TodoRepository } from '../../infrastructure/todo.repository';
import { Todo } from '../../domain/entities/todo.entity';
import { TodoStatus } from '../dto/todo-status.enum';

export class GetTodosQuery {
  constructor(public readonly status: TodoStatus) {}
}

@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
  constructor(private todoRepository: TodoRepository) {}

  async execute(query: GetTodosQuery): Promise<Todo[]> {
    const { status } = query;

    return this.todoRepository.findAll(status);
  }
}
