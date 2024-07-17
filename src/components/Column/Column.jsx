import './Column.scss';
import PropTypes from 'prop-types';
import { Reorder } from 'framer-motion';
import Note from '../Note/Note';
import { MdAdd } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useTranslation } from 'react-i18next';


function Column ({ boards, columnId, openedBoard, openModalWindow, addNewNote, updateOrderNoteIds }) {
    const { t } = useTranslation();

    return (
        <div className='column bordered'>
            <div className='column-title'>
                {boards.columns[columnId].title}
                <div className="boards-buttons-wrapper">
                    <button
                        className='button round-button bordered'
                        onClick={() => openModalWindow(
                            openedBoard,
                            "renameColumn",
                            boards.columns[columnId].title,
                            boards.columns[columnId].id)}
                    >
                        <MdEdit size="2em"/>
                    </button>
                    <button
                        className='button round-button bordered'
                        id='delete-board'
                        onClick={() => openModalWindow(
                            openedBoard,
                            "deleteColumn",
                            '',
                            boards.columns[columnId].id)}
                    >
                        <MdDelete size="2em"/>
                    </button>
                </div>
            </div>
            <div className='board-tasks-buttons'>
                <button 
                    type="button"
                    className="button rectangular-button additional-colored"
                    onClick={() => addNewNote(columnId, {content: 'note'})}
                >
                    <MdAdd size="2em"/>
                    {t("add-task-button")}
                </button>
            </div>
            <Reorder.Group
                as='div'
                axis='y'
                values={boards.columns[columnId].noteIds}
                onReorder={(newOrder) => updateOrderNoteIds(columnId, newOrder)}
                className='note-wrapper'
            >
                {boards.columns[columnId].noteIds.map(noteId => {
                    return (
                        <Note
                            key={noteId}
                            boards={boards}
                            noteId={noteId}
                        />
                    )
                })}
            </Reorder.Group>
        </div>
    );
}

Column.propTypes = {
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
    columnId: PropTypes.string.isRequired,
    openedBoard: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        columnIds: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    openModalWindow: PropTypes.func.isRequired,
    addNewNote: PropTypes.func.isRequired,
    updateOrderNoteIds: PropTypes.func.isRequired,
};

export default Column;