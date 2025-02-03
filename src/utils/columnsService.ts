import axios from '../axios';

export const createColumn = async (id: string, title: string) => {
    const { data } = await axios.post(`/boards/${id}/columns`, {title: title});
    return data;
};

export const deleteColumn = async (boardId: string, columnId: string) => {
    const { data } = await axios.delete(`/boards/${boardId}/columns/${columnId}`);
    return data;
};

export const updateColumn = async (id: string, columnId: string, title: string) => {
    const { data } = await axios.patch(`/boards/${id}/columns/${columnId}`, {title: title});
    return data;
};