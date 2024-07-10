import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { listOfTasks } from './constants';

export default function useBoardsState({ openedBoard }) {
    const [boards, setBoards] = useState(listOfTasks);

    const addNewBoard = ({title}) => {
        const newBoard = {
            id: nanoid(),
            title: title,
            columnIds: [],
        }

        const updatedBoards = {
            ...boards,
            boards: {
                ...boards.boards,
                [newBoard.id]: newBoard,
            },
        };

        setBoards(updatedBoards);
    };

    const addNewColumn = (boardId, title) => {
        const newColumn = {
            id: nanoid(),
            title: title,
            noteIds: [],
        };

        const updatedBoards = {
            ...boards,
            boards: {
                ...boards.boards,
                [boardId]: {
                    ...boards.boards[boardId],
                    columnIds: [...boards.boards[boardId].columnIds, newColumn.id],
                },
            },
            columns: {
                ...boards.columns,
                [newColumn.id]: newColumn,
            },
        };

        setBoards(updatedBoards);
    };

    const completelyDeleteBoard = () => {
        console.log('openedBoard.id', openedBoard.id);
        const updatedBoards = {...boards};
        delete updatedBoards.boards[openedBoard.id];
        setBoards(updatedBoards);
    };

    const deleteColumn = (boardId, columnId) => {
        const updatedColumnIds = boards.boards[boardId].columnIds.filter((column) => column !== columnId);
        const updatedBoards = {
            ...boards,
            boards: {
                ...boards.boards,
                [boardId]: {
                    ...boards.boards[boardId],
                    columnIds: updatedColumnIds,
                },
            },
        };

        setBoards(updatedBoards);
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

    const handleSaveBoard = (newBoard) => {
        openedBoard.id ? updateBoards({...newBoard, id: openedBoard.id}) : addNewBoard(newBoard);
    };

    return {
        boards,
        completelyDeleteBoard,
        handleSaveBoard,
        completelyDeleteBoard,
        addNewColumn,
        deleteColumn,
    };
}

useBoardsState.propTypes = {
    openedBoard: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        columnIds: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};