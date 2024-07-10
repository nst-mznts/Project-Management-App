import './BoardTasks.scss';
import PropTypes from 'prop-types';
import ModalWindow from '../ModalWindow/ModalWindow';
import { MdAdd } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useTranslation } from 'react-i18next';

function BoardTasks({
    boards,
    openBoardsPage,
    openedBoard,
    openModalWindow,
    isModalWindowOpened,
    closeModalWindow,
    onConfirm,
    actionType,
    initialTitle,
}) {
    const { t } = useTranslation();

    return (
        <>
            <main className="boards-page">
                <div className="boards-page-content">
                    <div className='board-tasks-button-wrapper'>
                        <div className='board-tasks-buttons'>
                            <button
                                type="button"
                                className="button rectangular-button bordered"
                                onClick={openBoardsPage}
                            >
                                {t("back-button")}
                            </button>
                        </div>
                        <h3 className='board-tasks-title'>{openedBoard.title}</h3>
                        <div className='board-tasks-buttons'>
                            <button 
                                type="button"
                                className="button rectangular-button colored"
                                onClick={() => openModalWindow(openedBoard, "addColumn")}
                            >
                                {t("add-column-button")}
                            </button>
                        </div>
                    </div>
                    <div className='column-wrapper'>
                        {openedBoard.columnIds.map(column => {
                            return (
                                <div className='column bordered' key={column}>
                                    <div className='column-title'>
                                        {boards.columns[column].title}
                                        <div className="boards-buttons-wrapper">
                                            <button
                                                className='button round-button bordered'
                                                onClick={() => openModalWindow(openedBoard, "renameColumn", boards.columns[column].title, boards.columns[column].id)}
                                            >
                                                <MdEdit size="2em"/>
                                            </button>
                                            <button
                                                className='button round-button bordered'
                                                id='delete-board'
                                                onClick={() => openModalWindow(openedBoard, "deleteColumn", '', boards.columns[column].id)}
                                            >
                                                <MdDelete size="2em"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='board-tasks-buttons'>
                                        <button 
                                            type="button"
                                            className="button rectangular-button additional-colored"
                                        >
                                            <MdAdd size="2em"/>
                                            {t("add-task-button")}
                                        </button>
                                    </div>
                                    <div className='note-wrapper'>
                                        {boards.columns[column].noteIds.map(noteId => {
                                            return (
                                                <div className='note bordered' key={noteId}>
                                                    {boards.notes[noteId].content}
                                                    <div className='note-footer'>
                                                        <button
                                                            className='button round-button bordered'
                                                            id='delete-board'
                                                        >
                                                            <MdDelete size="2em"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
            {isModalWindowOpened && (
                <ModalWindow
                    isOpen={isModalWindowOpened}
                    actionType={actionType}
                    onClose={closeModalWindow}
                    onConfirm={onConfirm}
                    initialTitle={initialTitle}
                />
            )}
        </>
    );
}

BoardTasks.propTypes = {
    boards: PropTypes.shape({
        boards: PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            columnIds: PropTypes.arrayOf(PropTypes.string),
        }),
        columns: PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            noteIds: PropTypes.arrayOf(PropTypes.string),
        }),
        notes: PropTypes.shape({
            id: PropTypes.string,
            content: PropTypes.string,
        }),
    }).isRequired,
    openBoardsPage: PropTypes.func.isRequired,
    openedBoard: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        columnIds: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    openModalWindow: PropTypes.func.isRequired,
    isModalWindowOpened: PropTypes.bool.isRequired,
    closeModalWindow: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    actionType: PropTypes.string.isRequired,
    initialTitle: PropTypes.string.isRequired,
};

export default BoardTasks;
