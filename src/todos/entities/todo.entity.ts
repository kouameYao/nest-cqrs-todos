import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type TodoStatus = 'completed' | 'in-progress' | 'to-do' | 'all';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 'to-do' })
  status: TodoStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
