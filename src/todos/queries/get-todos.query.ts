import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TodoRepository } from '../repository/todo.repository';
import { Todo, TodoStatus } from '../entities/todo.entity';

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
