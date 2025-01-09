import './Column.scss';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Note from '../Note/Note';
import { MdAdd } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useTranslation } from 'react-i18next';


function Column ({ column, id, openModalWindow, index, onDelete, boardId, notes }) {
    const { t } = useTranslation();

    //  console.log('notes ', notes);
    return (
        <Draggable draggableId={id} index={index}>
            {provided => (
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    className='column bordered'
                >
                    <div className='column-title'>
                        {column.title}
                        <div className="boards-buttons-wrapper">
                            <button
                                className='button round-button bordered'
                                onClick={() => openModalWindow("renameColumn", id, column.title)}
                            >
                                <MdEdit size="2em"/>
                            </button>
                            <button
                                className='button round-button bordered'
                                id='delete-board'
                                onClick={() => openModalWindow("deleteColumn", id)}
                            >
                                <MdDelete size="2em"/>
                            </button>
                        </div>
                    </div>
                    <div className='board-tasks-buttons'>
                        <button
                            type="button"
                            className="button rectangular-button additional-colored"
                            onClick={() => openModalWindow("addTask", id)}
                        >
                            <MdAdd size="2em"/>
                            {t("add-task-button")}
                        </button>
                    </div>
                    <Droppable droppableId={id} type="task">
                        {(provided, snapshot) => {
                            return (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className='note-wrapper'
                                >
                                    {

                                    }
                                    {/* {boards.columns[columnId].noteIds.map((noteId, index) => {
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
                                    {provided.placeholder} */}
                                </div>
                            )
                        }}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
}

// Column.propTypes = {
//     boards: PropTypes.shape({
//         boards: PropTypes.shape({
//             id: PropTypes.string,
//             title: PropTypes.string,
//             columnIds: PropTypes.arrayOf(PropTypes.string),
//         }),
//         columns: PropTypes.shape({
//             id: PropTypes.string,
//             title: PropTypes.string,
//             noteIds: PropTypes.arrayOf(PropTypes.string),
//         }),
//         notes: PropTypes.shape({
//             id: PropTypes.string,
//             content: PropTypes.string,
//         }),
//     }).isRequired,
//     columnId: PropTypes.string.isRequired,
//     openedBoard: PropTypes.shape({
//         id: PropTypes.string,
//         title: PropTypes.string,
//         columnIds: PropTypes.arrayOf(PropTypes.string),
//     }).isRequired,
//     openModalWindow: PropTypes.func.isRequired,
//     index: PropTypes.number.isRequired,
// };

export default Column;
