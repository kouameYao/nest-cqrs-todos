import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTodosQuery } from '../application/queries/impl/get-todos.query';
import { GetTodoByIdQuery } from '../application/queries/impl/get-todo-by-id.query';
import { TodoStatus } from '../application/dto/todo-status.enum';
import { CreateTodoCommand } from '../application/commands/impl/create-todo.command';
import { UpdateTodoCommand } from '../application/commands/impl/update-todo.command';
import { DeleteTodoCommand } from '../application/commands/impl/delete-todo.command';
import { CreateTodoDto, UpdateTodoDto } from '../domain/entities/todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getAllTodos(@Query('status') status: TodoStatus) {
    status = status || 'all';

    return this.queryBus.execute(new GetTodosQuery(status));
  }

  @Get(':id')
  async getTodoById(@Param('id') id: number) {
    return this.queryBus.execute(new GetTodoByIdQuery(id));
  }

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.commandBus.execute(
      new CreateTodoCommand(createTodoDto.title, createTodoDto.description),
    );
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: number,
    @Body('status') status: TodoStatus,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.commandBus.execute(
      new UpdateTodoCommand(
        id,
        status,
        updateTodoDto?.title,
        updateTodoDto?.description,
      ),
    );
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteTodoCommand(id));
  }
}
