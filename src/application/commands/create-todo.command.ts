import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { TodoCreatedEvent } from '../../domain/events/todo-created.event';
import { TodoRepository } from '../../infrastructure/todo.repository';

export class CreateTodoCommand {
  constructor(public readonly title: string) {}
}

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTodoCommand) {
    const { title } = command;
    const todo = await this.todoRepository.create({ title });

    this.eventBus.publishAll([new TodoCreatedEvent(todo.id, todo.title)]);

    return todo;
  }
}
