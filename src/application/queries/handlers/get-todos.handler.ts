import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TodoRepository } from '../../../infrastructure/todo.repository';
import { Todo } from '../../../domain/entities/todo.entity';
import { GetTodosQuery } from '../impl';

@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
  constructor(private todoRepository: TodoRepository) {}

  async execute(query: GetTodosQuery): Promise<Todo[]> {
    const { status } = query;

    return this.todoRepository.findAll(status);
  }
}
