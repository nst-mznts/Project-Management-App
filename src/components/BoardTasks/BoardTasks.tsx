import './BoardTasks.scss';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../axios';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchColumns } from '../../redux/slices/columns';
import { fetchTask } from '../../redux/slices/tasks';
import { ActionType } from '../../utils/types/ActionType.types';
import { Board, Column, Task } from '../../utils/types/BasicTypes.types';
import { useModal } from '../../utils/ModalContext';
import ColumnList from './ColumnList';

const BoardTasks: FC = () => {
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const columns = useAppSelector((state) => state.columns.columns.items) as Column[];
  const tasks = useAppSelector((state) => state.tasks.tasks.items) as Task[];
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const dispatch = useAppDispatch();
  const { setBoardId, openModal } = useModal();

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    axios
      .get<Board>(`/boards/${id}`)
      .then((res) => {
        setCurrentBoard(res.data);
        setBoardId(res.data._id);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
      });

    dispatch(fetchColumns(id));
    dispatch(fetchTask(id));
  }, [id, dispatch]);

  return (
    <>
      <main className="boards-page">
        <div className="boards-page-content">
          <div className="board-tasks-button-wrapper">
            <div className="board-tasks-buttons">
              <Link className="button rectangular-button bordered width100" to="/boards">
                {t('back-button')}
              </Link>
            </div>
            {isLoading ? (
              <div className="board-tasks-title-skeleton"></div>
            ) : (
              <h3 className="board-tasks-title">{currentBoard?.title}</h3>
            )}
            <div className="board-tasks-buttons">
              <button
                type="button"
                className="button rectangular-button colored width100"
                onClick={() => openModal(ActionType.AddColumn)}
              >
                {t('add-column-button')}
              </button>
            </div>
          </div>
          <ColumnList columns={columns} onOpen={openModal} boardId={id!} tasks={tasks} />
        </div>
      </main>
    </>
  );
};

export default BoardTasks;
