import './Board.scss';
import PropTypes from 'prop-types';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


function Board ({ board, openBoardTasksPage, onEdit, onDelete }) {
  return (
    <div className="board" >
        <h3
            className='board-title'
            onClick={() => openBoardTasksPage(board)}
        >
            {board.title}
        </h3>
        <div className="boards-buttons-wrapper">
            <button
                className='button round-button additional-colored'
                onClick={() => onEdit(board, 'edit')}
            >
                <MdEdit size="2em"/>
            </button>
            <button
                className='button round-button additional-colored'
                id='delete-board'
                onClick={() => onDelete(board, 'delete')}
            >
                <MdDelete size="2em"/>
            </button>
        </div>
    </div>

  );
}

Board.propTypes = {
    board: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        tasks: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
        })),
    }).isRequired,
    openBoardTasksPage: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Board;