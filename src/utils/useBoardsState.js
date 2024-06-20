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
          tasks: [],
        }
        const newBoards = [...boards, newBoard];
        setBoards(newBoards);
    };

    const memoriseBoardIdForDeletion = (id) => {
        setBoardIdForDeletion(id);
    };

    const completelyDeleteBoard = () => {
        const newBoards = boards.filter((board) => board.id !== boardIdForDeletion);
        setBoards(newBoards);
        setBoardIdForDeletion('');
        closeModalWindow();
        // close the modal window
    };
    
    const updateBoards = (newBoard) => {
        console.log('newBoard: ', newBoard);
        setBoards(boards.map(board => board.id === newBoard.id ? {...board, title: newBoard.title} : board));
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
        id: PropTypes.number,
        title: PropTypes.string,
        tasks: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
        })),
    }).isRequired,
    closeModalWindow: PropTypes.func.isRequired,
};