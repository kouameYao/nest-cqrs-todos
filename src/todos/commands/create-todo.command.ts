import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { TodoCreatedEvent } from '../events/todo-created.event';
import { TodoRepository } from '../repository/todo.repository';

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

    // Publier plusieurs événements en utilisant eventBus.publishAll
    this.eventBus.publishAll([new TodoCreatedEvent(todo.id, todo.title)]);

    return todo;
  }
}
