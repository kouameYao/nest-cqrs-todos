import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todos.controller';
import { Todo } from './entities/todo.entity';
import { CreateTodoHandler } from './commands/create-todo.command';
import { UpdateTodoHandler } from './commands/update-todo.command';
import { DeleteTodoHandler } from './commands/delete-todo.command';
import { GetTodosHandler } from './queries/get-todos.query';
import { GetTodoByIdHandler } from './queries/get-todo-by-id.query';
import { TodosSagas } from './sagas/todos.sagas';
import {
  TodoCreatedHandler,
  TodoCompletedHandler,
  TodoDeletedHandler,
} from './events/todo-event-handlers';
import { TodoRepository } from './repository/todo.repository';

const CommandHandlers = [
  CreateTodoHandler,
  UpdateTodoHandler,
  DeleteTodoHandler,
];
const QueryHandlers = [GetTodosHandler, GetTodoByIdHandler];
const EventHandlers = [
  TodoCreatedHandler,
  TodoCompletedHandler,
  TodoDeletedHandler,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [
    TodoRepository,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    TodosSagas,
  ],
})
export class TodosModule {}
