import './Note.scss';
import PropTypes from 'prop-types';
import { Reorder } from 'framer-motion';
import { MdDelete } from "react-icons/md";


function Note ({ boards, noteId }) {
  return (
    <Reorder.Item as='div' value={noteId} className='note bordered' >
        {boards.notes[noteId].content}
        <div className='note-footer'>
            <button
                className='button round-button bordered'
                id='delete-board'
            >
                <MdDelete size="2em"/>
            </button>
        </div>
    </Reorder.Item>
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