import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class NotifyUserCommand {
  constructor(
    public readonly todoId: number,
    public readonly message: string,
  ) {}
}

@CommandHandler(NotifyUserCommand)
export class NotifyUserHandler implements ICommandHandler<NotifyUserCommand> {
  async execute(command: NotifyUserCommand) {
    console.log(`Notification for todo ${command.todoId}: ${command.message}`);
    // comme envoyer un email ou une notification push
  }
}
