import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { TodoCreatedEvent } from '../events/todo-created.event';
import { NotifyUserCommand } from '../commands/notify-user.command';

@Injectable()
export class TodosSagas {
  @Saga()
  todoCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TodoCreatedEvent),
      delay(1000),
      map((event) => new NotifyUserCommand(event.id, 'New todo created!')),
    );
  };
}
