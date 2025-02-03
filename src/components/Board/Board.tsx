import './Board.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ActionType } from '../../utils/types';
import EditAndDeleteButtons from '../EditAndDeleteButtons/EditAndDeleteButtons';

type Board = {
    _id: string;
    title: string;
}

interface BoardProps {
    board: Board;
    openModalWindow: (actionType: ActionType, id?: string, initialTitle?: string) => void;
}

const Board:FC<BoardProps> = ({ board, openModalWindow}) => {

    const handleEditBoard = () => {
        openModalWindow(ActionType.RenameBoard, board._id, board.title);
    }

    const handleDeleteBoard = () => {
        openModalWindow(ActionType.DeleteBoard, board._id);
    }

    return (
        <div className="board" >
            <Link className='board-title' to={`/boards/${board._id}`}>
                <h3 className='board-title'>{board.title}</h3>
            </Link>
            <EditAndDeleteButtons
                onEdit={handleEditBoard}
                onDelete={handleDeleteBoard}
                buttonStyle='additional-colored'
            />
        </div>
    )
}

export default Board;
