import './Content.scss';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchBoards } from '../../redux/slices/boards';
import { useTranslation } from 'react-i18next';
import { ActionType } from '../../utils/types';
import { createBoard, deleteBoard, updateBoard } from '../../utils/boardsService';
import { createHandleConfirm } from '../../utils/handleConfirm';
import { MdAdd } from "react-icons/md";
import BoardList from './BoardList';
import ModalWindow from '../ModalWindow/ModalWindow';
import useModalWindow from '../../utils/useModalWindow';

const Content:FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { boards } = useAppSelector(state => state.boards);
    const isBoardsLoading = boards.status === 'loading';
    const {
        isModalOpen,
        actionType,
        initialTitle,
        boardIdForRemoving,
        openModal,
        closeModal,
    } = useModalWindow();

    useEffect(() => {
        dispatch(fetchBoards());
    }, []);

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
        closeModal,
    });

    return (
        <>
            <main className="boards-page">
                <div className="boards-page-content">
                    <div className='start-button'>
                        <button
                            className='button rectangular-button colored'
                            onClick={() => openModal(ActionType.AddBoard)}
                        >
                            <MdAdd size="2em"/>
                            {t("add-board-button")}
                        </button>
                    </div>
                    <BoardList
                        boards={boards.items}
                        isLoading={isBoardsLoading}
                        onOpenModal={openModal}
                    />
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
}

export default Content;
