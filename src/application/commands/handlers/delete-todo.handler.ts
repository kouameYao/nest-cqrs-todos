import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TodoRepository } from '../../../infrastructure/todo.repository';
import { DeleteTodoCommand } from '../impl/delete-todo.command';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(private todoRepository: TodoRepository) {}

  async execute(command: DeleteTodoCommand) {
    const { id } = command;
    await this.todoRepository.delete(id);
  }
}
