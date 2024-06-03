import './Boards.scss';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { MdAdd } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Sidebar from '../Sidebar/Sidebar';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import EditForm from '../EditForm/EditForm';
import ModalWindow from '../ModalWindow/ModalWindow';

let listOfTasks = [
    {id: 1, title: 'first board', tasks: [{id: 1, title: 'title 1'}, {id: 2, title: 'title 2'}]},
    {id: 2, title: 'second board', tasks: [{id: 3, title: 'title 3'}]},
    {id: 3, title: 'third board', tasks: []},
];

function Boards({ isSidebarOpen, openSidebar, openStartPage, userName }) {
    const [boards, setBoards] = useState(listOfTasks);
    const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
    const [closing, setClosing] = useState(false);
    const [openedBoard, setOpenedBoard] = useState({});
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
                        return (<div key={board.id} className="board">
                            {board.title}
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
                        openSidebar={openSidebar}
                        userName={userName}
                        onOpen={setIsModalWindowOpened}
                    />
                )}
            </div>
        </main>
    );
}
  
Boards.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    openSidebar: PropTypes.func.isRequired,
    openStartPage: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
};
  
export default Boards;