import axios from '../../axios';
import { Column } from '../types/BasicTypes.types';

export const createColumn = async (id: string, title: string): Promise<Column> => {
  const { data } = await axios.post<Column>(`/boards/${id}/columns`, { title: title });
  return data;
};

export const deleteColumn = async (
  boardId: string,
  columnId: string
): Promise<{ success: boolean }> => {
  const { data } = await axios.delete<{ success: boolean }>(
    `/boards/${boardId}/columns/${columnId}`
  );
  return data;
};

export const updateColumn = async (
  id: string,
  columnId: string,
  title: string
): Promise<Column> => {
  const { data } = await axios.patch<Column>(`/boards/${id}/columns/${columnId}`, { title: title });
  return data;
};
