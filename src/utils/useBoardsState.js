import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { listOfTasks } from './constants';

export default function useBoardsState({ openedBoard }) {
    const [boards, setBoards] = useState(listOfTasks);
    const [currentItemId, setCurrentItemId] = useState('');

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

    const addNewColumn = (boardId, {title}) => {
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
        const updatedBoards = {...boards};
        delete updatedBoards.boards[openedBoard.id];
        setBoards(updatedBoards);
    };

    const completelyDeleteColumn = () => {
        const updatedColumnIds = boards.boards[openedBoard.id].columnIds.filter((column) => column !== currentItemId);
        const updatedBoards = {
            ...boards,
            boards: {
                ...boards.boards,
                [openedBoard.id]: {
                    ...boards.boards[openedBoard.id],
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

    const updateColumns = (newColumn) => {
        setBoards(prevBoards => {
            return {
                ...prevBoards,
                columns: {
                    ...prevBoards.columns,
                    [newColumn.id]: {
                        ...prevBoards.columns[newColumn.id],
                        title: newColumn.title,
                    }
                },
                
            };
        });
    };

    const handleSaveColumns = (newColumn) => {
        currentItemId ? updateColumns({...newColumn, id: currentItemId}) : addNewColumn (openedBoard.id, newColumn);
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
        completelyDeleteColumn,
        setCurrentItemId,
        handleSaveColumns,
    };
}

useBoardsState.propTypes = {
    openedBoard: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        columnIds: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};