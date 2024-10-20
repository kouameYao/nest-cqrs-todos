export enum ETodoStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in-progress',
  TO_DO = 'to-do',
  ALL = 'all',
}

export type TodoStatus = `${ETodoStatus}`;
