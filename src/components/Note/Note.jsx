import './Note.scss';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { MdDelete } from "react-icons/md";


function Note ({ boards, noteId, index }) {
  return (
    <Draggable draggableId={noteId} index={index}>
        {(provided, snapshot) => {
            return (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className='note bordered'
                >
                    <div className='note-content'>{boards.notes[noteId].content}</div>
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
        }}
    </Draggable>
  );
}

Note.propTypes = {
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
    noteId: PropTypes.string.isRequired,
};

export default Note;