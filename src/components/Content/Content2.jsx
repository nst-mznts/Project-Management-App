import './Content.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards, fetchRemoveBoard } from '../../redux/slices/boards';
import axios from '../../axios';
import Board from '../Board/Board';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useTranslation } from 'react-i18next';
import { MdAdd } from "react-icons/md";

function Content2({
    openModalWindow,
    isModalWindowOpened,
    closeModalWindow,
    actionType,
    boardIdForRemoving,
    initialTitle,
}) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { boards } = useSelector(state => state.boards);
    const isBoardsLoading = boards.status === 'loading';
  
    useEffect(() => {
        dispatch(fetchBoards());
    }, []);

    const handleConfirm = (title, action, id='') => {
        switch (action) {
            case 'createBoard':
                onSubmit(title);
                break;
            case 'deleteBoard':
                onRemove(boardIdForRemoving);
                break;
            case 'renameBoard':
                onEdit(title, boardIdForRemoving);
                break;
            default:
                break;
        };
        closeModalWindow();
    };

    const onSubmit = async (title) => {
        try {
            const { data } = await axios.post('/boards', {title: title});
            dispatch(fetchBoards());
        } catch (err) {
            console.warn(err);
        }
    };

    const onRemove = (id) => {
        dispatch(fetchRemoveBoard(id));
    };

    const onEdit = async (title, id) => {
        const { data } = await axios.patch(`/boards/${id}`, {title: title});
        dispatch(fetchBoards());
    }

    return (
        <>
            <main className="boards-page">
                <div className="boards-page-content">
                    <div className='start-button'>
                        <button
                            className='button rectangular-button colored'
                            onClick={() => openModalWindow("createBoard")}
                        >
                            <MdAdd size="2em"/>
                            {t("add-board-button")}
                        </button>
                    </div>
                    <div className="boards-wrapper">
                        {(isBoardsLoading ? [...Array(3)] : boards.items).map((obj, index) => 
                            isBoardsLoading ? (
                                <Board key={index} isLoading={true} />
                            ) : (
                                <Board
                                    key={obj._id}
                                    board={obj}
                                    openModalWindow={openModalWindow}
                                />
                            )
                        )}
                    </div>
                </div>
            </main>
            {isModalWindowOpened && (
                <ModalWindow
                    actionType={actionType}
                    onClose={closeModalWindow}
                    onConfirm={handleConfirm}
                    initialTitle={initialTitle}
                />
            )}
        </>
    );
}

export default Content2;