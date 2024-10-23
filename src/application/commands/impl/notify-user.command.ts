export class NotifyUserCommand {
  constructor(
    public readonly todoId: number,
    public readonly message: string,
  ) {}
}
