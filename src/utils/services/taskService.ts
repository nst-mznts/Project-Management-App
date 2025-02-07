import axios from '../../axios';

export const createTask = async (title: string, boardId: string, columnId: string) => {
  const { data } = await axios.post(`/boards/${boardId}/columns/${columnId}`, { title: title });
  return data;
};

export const updateTask = async (boardId: string, taskId: string, title: string) => {
  const { data } = await axios.patch(`/boards/${boardId}/tasks/${taskId}`, { title: title });
  return data;
};

export const deleteTask = async (boardId: string, taskId: string) => {
  const { data } = await axios.delete(`/boards/${boardId}/tasks/${taskId}`);
  return data;
};
