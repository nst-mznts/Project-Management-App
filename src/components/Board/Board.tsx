import './Board.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ActionType } from '../../utils/types/ActionType.types';
import { BoardProps } from '../../utils/types/BasicTypes.types';
import EditAndDeleteButtons from '../EditAndDeleteButtons/EditAndDeleteButtons';

const Board: FC<BoardProps> = ({ board, openModalWindow }) => {
  return (
    <div className="board">
      <Link className="board-title" to={`/boards/${board._id}`}>
        <h3 className="board-title">{board.title}</h3>
      </Link>
      <EditAndDeleteButtons
        onEdit={() => openModalWindow(ActionType.RenameBoard, board._id, board.title)}
        onDelete={() => openModalWindow(ActionType.DeleteBoard, board._id)}
        buttonStyle="additional-colored"
      />
    </div>
  );
};

export default Board;
