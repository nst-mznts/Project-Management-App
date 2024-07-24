import './Column.scss';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Note from '../Note/Note';
import { MdAdd } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useTranslation } from 'react-i18next';


function Column ({ boards, columnId, openedBoard, openModalWindow, index }) {
    const { t } = useTranslation();

    return (
        <Draggable draggableId={columnId} index={index}>
            {provided => (
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    className='column bordered'
                >
                    <div className='column-title'>
                        {boards.columns[columnId].title}
                        <div className="boards-buttons-wrapper">
                            <button
                                className='button round-button bordered'
                                onClick={() => openModalWindow(
                                    openedBoard,
                                    "renameColumn",
                                    boards.columns[columnId].title,
                                    columnId)}
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
                                    columnId)}
                            >
                                <MdDelete size="2em"/>
                            </button>
                        </div>
                    </div>
                    <div className='board-tasks-buttons'>
                        <button
                            type="button"
                            className="button rectangular-button additional-colored"
                            onClick={() => openModalWindow(openedBoard, "addTask", '', columnId)}
                        >
                            <MdAdd size="2em"/>
                            {t("add-task-button")}
                        </button>
                    </div>
                    <Droppable droppableId={columnId} type="task">
                        {(provided, snapshot) => {
                            return (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className='note-wrapper'
                                >
                                    {boards.columns[columnId].noteIds.map((noteId, index) => {
                                        return (
                                            <Note
                                                key={noteId}
                                                boards={boards}
                                                noteId={noteId}
                                                index={index}
                                                openedBoard={openedBoard}
                                                openModalWindow={openModalWindow}
                                            />
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>
                </div>
            )}
        </Draggable>
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
    index: PropTypes.number.isRequired,
};

export default Column;
