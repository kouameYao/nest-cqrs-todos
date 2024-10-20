import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TodoRepository } from '../repository/todo.repository';

export class GetTodoByIdQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetTodoByIdQuery)
export class GetTodoByIdHandler implements IQueryHandler<GetTodoByIdQuery> {
  constructor(private todoRepository: TodoRepository) {}

  async execute(query: GetTodoByIdQuery) {
    const { id } = query;
    return this.todoRepository.findOne(id);
  }
}
