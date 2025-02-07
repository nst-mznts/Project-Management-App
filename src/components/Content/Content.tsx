import './Content.scss';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchBoards } from '../../redux/slices/boards';
import { userName, deleteUser } from '../../redux/slices/auth';
import { useTranslation } from 'react-i18next';
import { ActionType } from '../../utils/types/ActionType.types';
import { createBoard, deleteBoard, updateBoard } from '../../utils/services/boardsService';
import { createHandleConfirm } from '../../utils/handleConfirm';
import { MdAdd } from 'react-icons/md';
import BoardList from './BoardList';
import ModalWindow from '../ModalWindow/ModalWindow';
import useModalWindow from '../../utils/useModalWindow';
import Sidebar from '../Sidebar/Sidebar';

interface ContentProps {
  isSidebarOpen: boolean;
  handleCloseSidebar: () => void;
}

const Content: FC<ContentProps> = ({ isSidebarOpen, handleCloseSidebar }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards);
  const isBoardsLoading = boards.status === 'loading';
  const userData = useAppSelector(userName);
  const navigate = useNavigate();
  const { isModalOpen, actionType, initialTitle, boardIdForRemoving, openModal, closeModal } =
    useModalWindow();

  useEffect(() => {
    dispatch(fetchBoards());
    if (message) {
      console.log(message);
    }
  }, [message]);

  const handleConfirm = createHandleConfirm({
    onSubmit: async (title) => {
      await createBoard(title);
      dispatch(fetchBoards());
    },
    onRemove: async (id) => {
      await deleteBoard(id);
      dispatch(fetchBoards());
    },
    onEdit: async (id, title) => {
      await updateBoard(id, title);
      dispatch(fetchBoards());
    },
    deleteProfile: async () => {
      try {
        handleCloseSidebar();
        setMessage(t('delete-profile-message'));
        localStorage.removeItem('token');
        const action = await dispatch(deleteUser(userData._id));
        if (deleteUser.fulfilled.match(action)) {
          setTimeout(() => {
            navigate('/');
          }, 6000);
        } else {
          setMessage(t('delete-profile-error'));
        }
      } catch (error) {
        console.log(error);
        setMessage(t('delete-profile-error'));
      }
    },
    closeModal,
  });

  return (
    <>
      <main className="boards-page">
        <div className="boards-page-content">
          {message ? (
            <h3 className="board-tasks-title">{message}</h3>
          ) : (
            <>
              <div className="start-button">
                <button
                  className="button rectangular-button colored"
                  onClick={() => openModal(ActionType.AddBoard)}
                >
                  <MdAdd size="2em" />
                  {t('add-board-button')}
                </button>
              </div>
              <BoardList
                boards={boards.items}
                isLoading={isBoardsLoading}
                onOpenModal={openModal}
              />
            </>
          )}
        </div>
      </main>
      {isSidebarOpen && (
        <Sidebar onClose={handleCloseSidebar} userName={userData.name} onOpen={openModal} />
      )}
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

export default Content;
