import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';

import { TodoCompletedEvent } from '../../../domain/events/impl/todo-completed.event';
import { TodoRepository } from '../../../infrastructure/todo.repository';
import { UpdateTodoCommand } from '../impl/update-todo.command';

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(
    private todoRepository: TodoRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(updatedTodoDto: UpdateTodoCommand) {
    const { id, status } = updatedTodoDto;

    const updatedTodo = await this.todoRepository.update(id, updatedTodoDto);

    if (status) {
      this.eventBus.publish(new TodoCompletedEvent(id));
    }

    return updatedTodo;
  }
}
