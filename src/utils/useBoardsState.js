import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { listOfTasks } from './constants';

export default function useBoardsState({ openedBoard, closeModal, deleteProfile, setOpenedBoard }) {
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

        const updatedOpenedBoard = {
            ...openedBoard,
            columnIds: [...openedBoard.columnIds, newColumn.id],
        }
        setOpenedBoard(updatedOpenedBoard);
    };

    const addNewNote = (columnId, {content}) => {
        const newNote = {
            id: nanoid(),
            content: content,
        };

        const updatedBoards = {
            ...boards,
            columns: {
                ...boards.columns,
                [columnId]: {
                    ...boards.columns[columnId],
                    noteIds: [...boards.columns[columnId].noteIds, newNote.id],
                },
            },
            notes: {
                ...boards.notes,
                [newNote.id]: newNote,
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

        const updatedOpenedBoard = {
            ...openedBoard,
            columnIds: updatedColumnIds,
        }
        setOpenedBoard(updatedOpenedBoard);
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
        currentItemId ? 
            updateColumns({...newColumn, id: currentItemId}) :
            addNewColumn (openedBoard.id, newColumn);
    };

    const handleSaveBoard = (newBoard) => {
        openedBoard.id ?
            updateBoards({...newBoard, id: openedBoard.id}) :
            addNewBoard(newBoard);
    };

    const confirmActionForBoards = (title, actionType) => {
        console.log('actionType', actionType);
        switch (actionType) {
            case 'createBoard':
                handleSaveBoard({title: title});
                break;
            case 'renameBoard':
                handleSaveBoard({title: title});
                break;
            case 'deleteBoard':
                deleteBoard();
                break;
            case 'deleteProfile':
                deleteProfile();
                break;
            default:
                break;
        }
        closeModal();
    };

    const deleteBoard = () => {
        completelyDeleteBoard();
        closeModal();
    };

    const confirmActionForColumn = (title, actionType) => {
        switch (actionType) {
            case 'addColumn':
                console.log('addColumn');
                handleSaveColumns({title: title});
                break;
            case 'renameColumn':
                handleSaveColumns({title: title});
                break;
            case 'deleteColumn':
                deleteColumn();
                break;
            case 'addTask':
                addNewNote(currentItemId, {content: title});
                break;
            default:
                break;
        }
        closeModal();
    };

    const deleteColumn = () => {
        completelyDeleteColumn();
        closeModal();
    };

    const updateOrderNoteIds = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = boards.columns[source.droppableId];
            const destinationColumn = boards.columns[destination.droppableId];
            const sourceItems = [...sourceColumn.noteIds];
            const destinationItems = [...destinationColumn.noteIds];
            const [removed] = sourceItems.splice(source.index, 1);
            destinationItems.splice(destination.index, 0, removed);
            setBoards({
                ...boards,
                columns: {
                    ...boards.columns,
                    [source.droppableId]: {
                        ...sourceColumn,
                        noteIds: sourceItems,
                    },
                    [destination.droppableId]: {
                        ...destinationColumn,
                        noteIds: destinationItems,
                    }
                },
            });
        } else {
            const column = boards.columns[source.droppableId];
            const copiedItems = [...column.noteIds];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setBoards({
                ...boards,
                columns: {
                    ...boards.columns,
                    [source.droppableId]: {
                        ...column,
                        noteIds: copiedItems,
                    }
                },
            });
        }
    };

    return {
        boards,
        completelyDeleteBoard,
        setCurrentItemId,
        confirmActionForBoards,
        confirmActionForColumn,
        updateOrderNoteIds,
    };
}

useBoardsState.propTypes = {
    openedBoard: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        columnIds: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    closeModal: PropTypes.func.isRequired,
    deleteProfile: PropTypes.func.isRequired,
    setOpenedBoard: PropTypes.func.isRequired,
};