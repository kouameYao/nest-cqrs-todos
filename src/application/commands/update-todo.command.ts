import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';

import { TodoCompletedEvent } from '../../domain/events/todo-completed.event';
import { TodoRepository } from '../../infrastructure/todo.repository';
import { TodoStatus } from '../dto/status';

export class UpdateTodoCommand {
  constructor(public readonly id: number, public readonly status: TodoStatus) {}
}

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(
    private todoRepository: TodoRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateTodoCommand) {
    const { id, status } = command;

    const updatedTodo = await this.todoRepository.update(id, { status });

    if (status) {
      this.eventBus.publish(new TodoCompletedEvent(id));
    }

    return updatedTodo;
  }
}
