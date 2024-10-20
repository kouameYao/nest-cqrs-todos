import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoCreatedEvent } from './todo-created.event';
import { TodoCompletedEvent } from './todo-completed.event';
import { TodoDeletedEvent } from './todo-deleted.event';

@EventsHandler(TodoCreatedEvent)
export class TodoCreatedHandler implements IEventHandler<TodoCreatedEvent> {
  handle(event: TodoCreatedEvent) {
    console.log(`Todo created: ${event.id} - ${event.title}`);
    // Ici, vous pourriez effectuer d'autres actions en réponse à la création d'un todo
  }
}

@EventsHandler(TodoCompletedEvent)
export class TodoCompletedHandler implements IEventHandler<TodoCompletedEvent> {
  handle(event: TodoCompletedEvent) {
    console.log(`Todo completed: ${event.id}`);
    // Vous pourriez par exemple mettre à jour des statistiques ici
  }
}

@EventsHandler(TodoDeletedEvent)
export class TodoDeletedHandler implements IEventHandler<TodoDeletedEvent> {
  handle(event: TodoDeletedEvent) {
    console.log(`Todo deleted: ${event.id}`);
    // Vous pourriez effectuer des nettoyages ou mises à jour ici
  }
}
