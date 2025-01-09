import './Board.scss';
// import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import BoardSkeleton from './Skeleton';
// import { fetchRemoveBoard } from '../../redux/slices/boards';

function Board ({ isLoading, board, openModalWindow}) {
    // const dispatch = useDispatch();

    if (isLoading) {
        return <BoardSkeleton />;
    }

    // const onRemove = () => {
    //     dispatch(fetchRemoveBoard(board._id));
    // }

    return (
    <div className="board" >
        <Link className='board-title' to={`/boards/${board._id}`}>
            <h3 className='board-title'>{board.title}</h3>
        </Link>
        <div className="boards-buttons-wrapper">
            <button
                className='button round-button additional-colored'
                onClick={() => openModalWindow("renameBoard", board._id, board.title)}
            >
                <MdEdit size="2em"/>
            </button>
            <button
                className='button round-button additional-colored'
                id='delete-board'
                onClick={() => openModalWindow("deleteBoard", board._id)}
            >
                <MdDelete size="2em"/>
            </button>
        </div>
    </div>

  );
}

// Board.propTypes = {
//     board: PropTypes.shape({
//         id: PropTypes.string,
//         title: PropTypes.string,
//         columnIds: PropTypes.arrayOf(PropTypes.string),
//     }).isRequired,
//     openBoardTasksPage: PropTypes.func.isRequired,
//     onEdit: PropTypes.func.isRequired,
//     onDelete: PropTypes.func.isRequired,
// };

export default Board;
