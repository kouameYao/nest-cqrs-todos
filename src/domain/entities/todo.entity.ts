import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { TodoStatus } from '../../application/dto/todo-status.enum';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'to-do' })
  status: TodoStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export type CreateTodoDto = {
  title: string;
  description: string;
};

export type UpdateTodoDto = Partial<CreateTodoDto> & {
  status?: TodoStatus;
};
