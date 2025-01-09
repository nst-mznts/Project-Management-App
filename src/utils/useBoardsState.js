import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { listOfTasks } from './constants';

export default function useBoardsState({ deleteProfile }) {
    const [boards, setBoards] = useState(listOfTasks);
    const [openedBoard, setOpenedBoard] = useState({});
    const [currentItemId, setCurrentItemId] = useState('');

    const addNewItem = (type, parentId, newItem) => {
        const id = nanoid();
        const updatedBoards = {
            ...boards,
            [type]: {
                ...boards[type],
                [id]: { ...newItem, id },
            },
        };
    
        if (type === 'columns') {
            updatedBoards.boards[parentId].columnIds.push(id);
        } else if (type === 'notes') {
            updatedBoards.columns[parentId].noteIds.push(id);
        }
    
        setBoards(updatedBoards);
    };

    const updateItem = (type, updatedItem) => {
        setBoards(prevBoards => ({
            ...prevBoards,
            [type]: {
                ...prevBoards[type],
                [updatedItem.id]: { ...prevBoards[type][updatedItem.id], ...updatedItem },
            },
        }));
    };

    const deleteItem = (type, itemId, parentId) => {
        const updatedBoards = { ...boards };
        delete updatedBoards[type][itemId];
    
        if (type === 'columns') {
            updatedBoards.boards[parentId].columnIds = updatedBoards.boards[parentId].columnIds.filter(id => id !== itemId);
            setOpenedBoard({
                ...openedBoard,
                columnIds: updatedBoards.boards[parentId].columnIds,
            });
        } else if (type === 'notes') {
            updatedBoards.columns[parentId].noteIds = updatedBoards.columns[parentId].noteIds.filter(id => id !== itemId);
        }
    
        setBoards(updatedBoards);
    };

    const confirmAction = (title, actionType) => {
        switch (actionType) {
            case 'addColumn':
                addNewItem('columns', openedBoard.id, { title: title, noteIds: [] });
                break;
            case 'renameColumn':
                updateItem('columns', {...{title: title}, id: currentItemId});
                break;
            case 'addTask':
                addNewItem('notes', currentItemId, { content: title });
                break;
            case 'renameTask':
                updateItem('notes', {...{content: title}, id: currentItemId});
                break;
            case 'createBoard':
                addNewItem('boards', null, { title, columnIds: [] });
                break;
            case 'renameBoard':
                updateItem('boards', {...{title: title}, id: openedBoard.id});
                break;
            case 'deleteBoard':
                deleteItem('boards', openedBoard.id, null);
                break;
            case 'deleteColumn':
                deleteItem('columns', currentItemId, openedBoard.id);
                break;
            case 'deleteTask':
                deleteItem('notes', currentItemId, findColumnByNoteId(currentItemId).id);
                break;
            case 'deleteProfile':
                deleteProfile();
                break;
            default:
                break;
        }
    };

    const findColumnByNoteId = (noteId) => {
        for (const columnId in boards.columns) {
            if (boards.columns[columnId].noteIds.includes(noteId)) {
                return boards.columns[columnId];
            }
        }
        return null;
    };

    const updateOrderNoteIds = (result) => {
        if (!result.destination) return;
        const { source, destination, draggableId, type } = result;

        if (type === 'column') {
            const newColumnOrder = Array.from(boards.boards[openedBoard.id].columnIds);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
            const updatedBoards = {
                ...boards,
                boards: {
                    ...boards.boards,
                    [openedBoard.id]: {
                        ...boards.boards[openedBoard.id],
                        columnIds: newColumnOrder,
                    },
                }
            };
            setBoards(updatedBoards);
            setOpenedBoard({
                ...openedBoard,
                columnIds: newColumnOrder,
            });
            return;
        } else if (type === 'task') {
            const sourceColumn = boards.columns[source.droppableId];
            const destinationColumn = boards.columns[destination.droppableId];
        
            const sourceItems = Array.from(sourceColumn.noteIds);
            const destinationItems = Array.from(destinationColumn.noteIds);
        
            const [removed] = sourceItems.splice(source.index, 1);
        
            if (source.droppableId !== destination.droppableId) {
                destinationItems.splice(destination.index, 0, removed);
                setBoards({
                    ...boards,
                    columns: {
                    ...boards.columns,
                    [source.droppableId]: { ...sourceColumn, noteIds: sourceItems },
                    [destination.droppableId]: { ...destinationColumn, noteIds: destinationItems },
                    },
                });
            } else {
                sourceItems.splice(destination.index, 0, removed);
                setBoards({
                    ...boards,
                    columns: {
                    ...boards.columns,
                    [source.droppableId]: { ...sourceColumn, noteIds: sourceItems },
                    },
                });
            }

        }
    };

    return {
        boards,
        setCurrentItemId,
        updateOrderNoteIds,
        confirmAction,
        openedBoard,
        setOpenedBoard,
    };
}

useBoardsState.propTypes = {
    deleteProfile: PropTypes.func.isRequired,
};
