import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoCompletedEvent } from '../impl';

@EventsHandler(TodoCompletedEvent)
export class TodoCompletedHandler implements IEventHandler<TodoCompletedEvent> {
  handle(event: TodoCompletedEvent) {
    console.log(`Todo completed: ${event.id}`);
    // Vous pourriez par exemple mettre à jour des statistiques ici
  }
}
