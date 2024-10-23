import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { TodoCreatedEvent } from '../../../domain/events/impl/todo-created.event';
import { TodoRepository } from '../../../infrastructure/todo.repository';
import { CreateTodoCommand } from '../impl/create-todo.command';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(newTodo: CreateTodoCommand) {
    const todo = await this.todoRepository.create(newTodo);

    this.eventBus.publishAll([new TodoCreatedEvent(todo.id, todo.title)]);

    return todo;
  }
}
