import './Content.scss';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchBoards } from '../../redux/slices/boards';
import { useTranslation } from 'react-i18next';
import { ActionType } from '../../utils/types/ActionType.types';
import { MdAdd } from 'react-icons/md';
import BoardList from './BoardList';
import { useModal } from '../../utils/ModalContext';

const Content: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards);
  const isBoardsLoading: boolean = boards.status === 'loading';
  const { openModal } = useModal();

  useEffect(() => {
    dispatch(fetchBoards());
  }, []);

  return (
    <>
      <main className="boards-page">
        <div className="boards-page-content">
          <div className="start-button">
            <button
              className="button rectangular-button colored"
              onClick={() => openModal(ActionType.AddBoard)}
            >
              <MdAdd size="2em" />
              {t('add-board-button')}
            </button>
          </div>
          <BoardList boards={boards.items} isLoading={isBoardsLoading} onOpenModal={openModal} />
        </div>
      </main>
    </>
  );
};

export default Content;
