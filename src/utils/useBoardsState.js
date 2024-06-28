import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { listOfTasks } from './constants';

export default function useBoardsState({ openedBoard, closeModalWindow }) {
    const [boards, setBoards] = useState(listOfTasks);
    const [boardIdForDeletion, setBoardIdForDeletion] = useState(null);

    const addNewBoard = ({title}) => {
        const newBoard = {
          id: nanoid(),
          title: title,
          columnIds: [],
        }
        setBoards({
        ...boards,
        boards: {
            ...boards.boards,
            [newBoard.id]: newBoard,
        },
        });
    };

    const memoriseBoardIdForDeletion = (id) => {
        setBoardIdForDeletion(id);
    };

    const completelyDeleteBoard = () => {
        setBoards(prevBoards => {
            const newBoards = { ...prevBoards };
            delete newBoards.boards[boardIdForDeletion];
            return newBoards;
        });
        setBoardIdForDeletion('');
        closeModalWindow();
    };

    const updateBoards = (newBoard) => {
        setBoards(prevBoards => {
            return {
                ...prevBoards,
                boards: {
                    ...prevBoards.boards,
                    [newBoard.id]: {
                        ...prevBoards.boards[newBoard.id],
                        title: newBoard.title,
                    },
                },
            };
        });
    };

    const handleSaveNote = (newBoard) => {
        openedBoard.id ? updateBoards({...newBoard, id: openedBoard.id}) : addNewBoard(newBoard);
        closeModalWindow();
    };

    return {
        boards,
        completelyDeleteBoard,
        handleSaveNote,
        memoriseBoardIdForDeletion,
        completelyDeleteBoard,
    };
}

useBoardsState.propTypes = {
    openedBoard: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        columnIds: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    closeModalWindow: PropTypes.func.isRequired,
};