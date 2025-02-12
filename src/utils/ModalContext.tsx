import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { ActionType } from '../utils/types/ActionType.types';
import ModalWindow from '../components/ModalWindow/ModalWindow';
import { createBoard, deleteBoard, updateBoard } from '../utils/services/boardsService';
import { createColumn, deleteColumn, updateColumn } from '../utils/services/columnsService';
import { createTask, updateTask, deleteTask } from '../utils/services/taskService';
import { fetchBoards } from '../redux/slices/boards';
import { fetchColumns } from '../redux/slices/columns';
import { fetchTask } from '../redux/slices/tasks';
import { deleteUser } from '../redux/slices/auth';

interface ModalContextType {
  isModalOpen: boolean;
  actionType: ActionType;
  initialTitle: string;
  currentId: string;
  openModal: (actionType: ActionType, id?: string, initialTitle?: string) => void;
  closeModal: () => void;
  setBoardId: (id: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionType>(ActionType.AddBoard);
  const [initialTitle, setInitialTitle] = useState<string>('');
  const [id, setBoardId] = useState<string>('');
  const [currentId, setCurrentId] = useState<string>('');

  const openModal = (actionType: ActionType, id: string = '', initialTitle: string = ''): void => {
    setActionType(actionType);
    setCurrentId(id);
    setInitialTitle(initialTitle);
    setModalOpen(true);
  };

  const closeModal = (): void => setModalOpen(false);

  const handleConfirm = async (title: string) => {
    console.log('handleConfirm', id, currentId, actionType);
    try {
      switch (actionType) {
        case ActionType.AddBoard:
          await createBoard(title);
          dispatch(fetchBoards());
          break;
        case ActionType.RenameBoard:
          if (currentId) {
            await updateBoard(currentId, title);
            dispatch(fetchBoards());
          }
          break;
        case ActionType.DeleteBoard:
          if (currentId) {
            await deleteBoard(currentId);
            dispatch(fetchBoards());
          }
          break;
        case ActionType.AddColumn:
          if (id) {
            await createColumn(id, title);
            dispatch(fetchColumns(id));
          }
          break;
        case ActionType.RenameColumn:
          if (id && currentId) {
            await updateColumn(id, currentId, title);
            dispatch(fetchColumns(id));
          }
          break;
        case ActionType.DeleteColumn:
          if (id && currentId) {
            await deleteColumn(id, currentId);
            dispatch(fetchColumns(id));
          }
          break;
        case ActionType.AddTask:
          if (id && currentId) {
            await createTask(title, id, currentId);
            dispatch(fetchTask(id));
          }
          break;
        case ActionType.RenameTask:
          if (id && currentId) {
            await updateTask(id, currentId, title);
            dispatch(fetchTask(id));
          }
          break;
        case ActionType.DeleteTask:
          if (id && currentId) {
            await deleteTask(id, currentId);
            dispatch(fetchTask(id));
          }
          break;
        case ActionType.DeleteProfile:
          if (id) {
            localStorage.removeItem('token');
            await dispatch(deleteUser(id));
            setTimeout(() => {
              navigate('/');
            }, 6000);
          }
          break;

        default:
          console.warn('Error executing action:', actionType);
          break;
      }
    } catch (error) {
      console.error('Error executing action:', error);
    }

    closeModal();
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        actionType,
        initialTitle,
        currentId,
        openModal,
        closeModal,
        setBoardId,
      }}
    >
      {children}
      {isModalOpen && (
        <ModalWindow
          actionType={actionType}
          onClose={closeModal}
          onConfirm={(title) => handleConfirm(title)}
          initialTitle={initialTitle}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal должен использоваться внутри ModalProvider');
  }
  return context;
};
