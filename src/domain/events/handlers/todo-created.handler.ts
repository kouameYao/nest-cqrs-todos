import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoCreatedEvent } from '../impl';

@EventsHandler(TodoCreatedEvent)
export class TodoCreatedHandler implements IEventHandler<TodoCreatedEvent> {
  handle(event: TodoCreatedEvent) {
    console.log(`Todo created: ${event.id} - ${event.title}`);
    // Ici, vous pourriez effectuer d'autres actions en réponse à la création d'un todo
  }
}
