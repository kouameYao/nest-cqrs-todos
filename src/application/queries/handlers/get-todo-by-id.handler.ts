import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TodoRepository } from '../../../infrastructure/todo.repository';
import { GetTodoByIdQuery } from '../impl';

@QueryHandler(GetTodoByIdQuery)
export class GetTodoByIdHandler implements IQueryHandler<GetTodoByIdQuery> {
  constructor(private todoRepository: TodoRepository) {}

  async execute(query: GetTodoByIdQuery) {
    const { id } = query;
    return this.todoRepository.findOne(id);
  }
}
