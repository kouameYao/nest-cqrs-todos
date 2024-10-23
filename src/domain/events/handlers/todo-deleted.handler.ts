import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoDeletedEvent } from '../impl';

@EventsHandler(TodoDeletedEvent)
export class TodoDeletedHandler implements IEventHandler<TodoDeletedEvent> {
  handle(event: TodoDeletedEvent) {
    console.log(`Todo deleted: ${event.id}`);
    // Vous pourriez effectuer des nettoyages ou mises à jour ici
  }
}
