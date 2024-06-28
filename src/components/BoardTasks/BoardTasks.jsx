import './BoardTasks.scss';
import PropTypes from 'prop-types';
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useTranslation } from 'react-i18next';

function BoardTasks({ boards, openBoardsPage, openedBoard }) {
    const { t } = useTranslation();

    return (
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
                                    <button
                                        className='button round-button bordered'
                                        id='delete-board'
                                    >
                                        <MdDelete size="2em"/>
                                    </button>
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
};

export default BoardTasks;
