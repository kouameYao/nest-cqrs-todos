import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TodoRepository } from '../../infrastructure/todo.repository';

export class DeleteTodoCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(private todoRepository: TodoRepository) {}

  async execute(command: DeleteTodoCommand) {
    const { id } = command;
    await this.todoRepository.delete(id);
  }
}
