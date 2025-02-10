import axios from '../../axios';
import { Board } from '../types/BasicTypes.types';

export const createBoard = async (title: string): Promise<Board> => {
  const { data } = await axios.post<Board>('/boards', { title });
  return data;
};

export const deleteBoard = async (id: string): Promise<{ success: boolean }> => {
  const { data } = await axios.delete<{ success: boolean }>(`/boards/${id}`);
  return data;
};

export const updateBoard = async (id: string, title: string): Promise<Board> => {
  const { data } = await axios.patch<Board>(`/boards/${id}`, { title });
  return data;
};
