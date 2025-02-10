import axios from '../../axios';
import { Task } from '../types/BasicTypes.types';

export const createTask = async (
  title: string,
  boardId: string,
  columnId: string
): Promise<Task> => {
  const { data } = await axios.post<Task>(`/boards/${boardId}/columns/${columnId}`, {
    title: title,
  });
  return data;
};

export const updateTask = async (boardId: string, taskId: string, title: string): Promise<Task> => {
  const { data } = await axios.patch<Task>(`/boards/${boardId}/tasks/${taskId}`, { title: title });
  return data;
}; // точно ли возвращает Task, а не success: boolean??

export const deleteTask = async (
  boardId: string,
  taskId: string
): Promise<{ success: boolean }> => {
  const { data } = await axios.delete<{ success: boolean }>(`/boards/${boardId}/tasks/${taskId}`);
  return data;
};
