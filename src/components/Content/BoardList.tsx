import { FC } from 'react';
import Board from '../Board/Board';
import BoardSkeleton from '../Board/Skeleton';
import { ActionType } from '../../utils/types';

interface BoardListProps {
    boards: Board[];
    isLoading: boolean;
    onOpenModal:(actionType: ActionType, id?: string, initialTitle?: string) => void;
}

const BoardList: FC<BoardListProps> = ({ boards, isLoading, onOpenModal }) => {
    return (
        <div className="boards-wrapper">
            {(isLoading ? [...Array(3)] : boards).map((obj, index) =>
                isLoading ? (
                    <BoardSkeleton key={index} />
                ) : (
                    <Board key={obj._id} board={obj} openModalWindow={onOpenModal} />
                )
            )}
        </div>
    );
};

export default BoardList;
