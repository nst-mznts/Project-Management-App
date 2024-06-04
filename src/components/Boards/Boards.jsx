import './Boards.scss';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { MdAdd } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Sidebar from '../Sidebar/Sidebar';
import EditForm from '../EditForm/EditForm';
import ModalWindow from '../ModalWindow/ModalWindow';

function Boards({
    boards,
    setBoards,
    openedBoard,
    setOpenedBoard,
    isSidebarOpen,
    onClose,
    openStartPage,
    userName,
    openBoardTasksPage
}) {
    const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
    const [closing, setClosing] = useState(false);
    const { t } = useTranslation();

    const addNewBoard = ({title}) => {
        const newBoard = {
          id: nanoid(),
          title: title,
          tasks: [],
        }
        const newBoards = [...boards, newBoard];
        setBoards(newBoards);
        closeEditForm();
    };

    const openEditForm = (board = {}) => {
        setClosing(true);
        setOpenedBoard(board);
        console.log('boards: ', boards);
    };

    const completelyDeleteBoard = (id) => {
        const newBoards = boards.filter((board) => board.id !== id);
        setBoards(newBoards);
    }

    const closeEditForm = () => {
        setClosing(false);
        setOpenedBoard({});
    }

    const updateBoards = (newBoard) => {
        console.log('newBoard: ', newBoard);
        setBoards(boards.map(board => board.id === newBoard.id ? {...board, title: newBoard.title} : board));
    }

    const handleSaveNote = (newBoard) => {
        openedBoard.id ? updateBoards({...newBoard, id: openedBoard.id}) : addNewBoard(newBoard);
        setClosing(false);
    }

    return (
        <main className="boards-page">
            <div className="boards-page-content">
                <div className='start-button'>
                    <button className='button rectangular-button colored' onClick={openEditForm}>
                        <MdAdd size="2em"/>
                        {t("add-board-button")}
                    </button>
                </div>
                <div className="boards-wrapper">
                {closing && <EditForm openedBoard={openedBoard} onCancel={closeEditForm} onSave={handleSaveNote} />}
                    {boards.map(board => {
                        return (<div key={board.id} className="board" >
                            <h3 className='board-title' onClick={() => openBoardTasksPage(board)}>{board.title}</h3>
                            <div className="boards-buttons-wrapper">
                                <button className='button round-button additional-colored' onClick={() => openEditForm(board)}>
                                    <MdEdit size="2em"/>
                                </button>
                                <button className='button round-button additional-colored' onClick={() => completelyDeleteBoard(board.id)}>
                                    <MdDelete size="2em"/>
                                </button>
                            </div>
                        </div>)
                    })}
                </div>
                {isModalWindowOpened && (
                    <ModalWindow
                        message="delete-confirmation"
                        buttonText="delete-button"
                        onCancel={setIsModalWindowOpened}
                        onReset={openStartPage}
                    />
                )}
                {isSidebarOpen && (
                    <Sidebar
                        openStartPage={openStartPage}
                        onClose={onClose}
                        userName={userName}
                        onOpen={setIsModalWindowOpened}
                    />
                )}
            </div>
        </main>
    );
}
  
Boards.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        tasks: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
        })),
    })).isRequired,
    setBoards: PropTypes.func.isRequired,
    openedBoard: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        tasks: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
        })),
    }).isRequired,
    setOpenedBoard: PropTypes.func.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    openStartPage: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
    openBoardTasksPage: PropTypes.func.isRequired,
};
  
export default Boards;
