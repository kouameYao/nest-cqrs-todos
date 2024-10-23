import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotifyUserCommand } from '../impl/notify-user.command';

@CommandHandler(NotifyUserCommand)
export class NotifyUserHandler implements ICommandHandler<NotifyUserCommand> {
  async execute(command: NotifyUserCommand) {
    console.log(`Notification for todo ${command.todoId}: ${command.message}`);
    // comme envoyer un email ou une notification push
  }
}
