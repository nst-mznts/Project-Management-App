import { ActionType } from './ActionType.types';

/** Base type for entities with ID */
export interface BaseEntity {
  _id: string;
  title: string;
}

/** Universal list with the possibility of modal interaction */
export interface ListProps<T extends BaseEntity> {
  boards: T[];
  isLoading: boolean;
  onOpenModal: (actionType: ActionType, id?: string, initialTitle?: string) => void;
}

/** User description */
export interface User {
  _id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

/** Board description */
export interface Board extends BaseEntity {
  user: User;
  createdAt: string;
  updatedAt: string;
}

/** Column description */
export interface Column extends BaseEntity {
  board: Board;
  createdAt: string;
  updatedAt: string;
  order: number;
}

/** Task description */
export interface Task extends BaseEntity {
  board: string;
  column: Column;
  createdAt: string;
  updatedAt: string;
  order: number;
}

/** Props for a single board */
export interface BoardProps {
  board: Board;
  openModalWindow: (actionType: ActionType, id?: string, initialTitle?: string) => void;
}

/** Props for the board list */
export type BoardListProps = ListProps<Board>;

/** Props for column list */
export interface ColumnListProps {
  columns: Column[];
  boardId: string;
  tasks: Task[];
  onOpen: (actionType: ActionType, id?: string, initialTitle?: string) => void;
}

/** Props for a single column */
export interface ColumnProps {
  column: Column;
  index: number;
  tasks: Task[];
  openModalWindow: (actionType: ActionType, id?: string, initialTitle?: string) => void;
}

/** Props for task list */
export interface TaskProps {
  task: Task;
  index: number;
  openModalWindow: (actionType: ActionType, id?: string, initialTitle?: string) => void;
}
