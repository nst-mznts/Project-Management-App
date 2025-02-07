import axios from '../../axios';

export const createBoard = async (title: string) => {
  const { data } = await axios.post('/boards', { title });
  return data;
};

export const deleteBoard = async (id: string) => {
  const { data } = await axios.delete(`/boards/${id}`);
  return data;
};

export const updateBoard = async (id: string, title: string) => {
  const { data } = await axios.patch(`/boards/${id}`, { title });
  return data;
};
