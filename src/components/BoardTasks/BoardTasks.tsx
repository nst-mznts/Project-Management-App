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
import { createHandleConfirm } from '../../utils/handleConfirm';
import { createColumn, deleteColumn, updateColumn } from '../../utils/services/columnsService';
import { createTask, updateTask, deleteTask } from '../../utils/services/taskService';
import ModalWindow from '../ModalWindow/ModalWindow';
import useModalWindow from '../../utils/useModalWindow';
import ColumnList from './ColumnList';

const BoardTasks: FC = () => {
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const columns = useAppSelector((state) => state.columns.columns.items) as Column[];
  const tasks = useAppSelector((state) => state.tasks.tasks.items) as Task[];
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const dispatch = useAppDispatch();
  const { isModalOpen, actionType, initialTitle, boardIdForRemoving, openModal, closeModal } =
    useModalWindow();

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    axios
      .get<Board>(`/boards/${id}`)
      .then((res) => {
        setCurrentBoard(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
      });

    dispatch(fetchColumns(id));
    dispatch(fetchTask(id));
  }, [id, dispatch]);

  const handleConfirm = createHandleConfirm({
    onSubmit: async (title: string) => {
      if (!id) return;
      await createColumn(id, title);
      dispatch(fetchColumns(id));
    },
    onRemove: async (columnId: string) => {
      if (!id) return;
      await deleteColumn(id, columnId);
      dispatch(fetchColumns(id));
    },
    onEdit: async (columnId: string, title: string) => {
      if (!id) return;
      await updateColumn(id, columnId, title);
      dispatch(fetchColumns(id));
    },
    addTask: async (title: string, columnId: string) => {
      if (!id) return;
      await createTask(title, id, columnId);
      dispatch(fetchTask(id));
    },
    editTask: async (title: string) => {
      if (!id) return;
      await updateTask(id, boardIdForRemoving, title);
      dispatch(fetchTask(id));
    },
    removeTask: async () => {
      if (!id) return;
      await deleteTask(id, boardIdForRemoving);
      dispatch(fetchTask(id));
    },
    closeModal,
  });

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
      {isModalOpen && (
        <ModalWindow
          actionType={actionType}
          onClose={closeModal}
          onConfirm={(title) => handleConfirm(title, actionType, boardIdForRemoving)}
          initialTitle={initialTitle}
        />
      )}
    </>
  );
};

export default BoardTasks;
