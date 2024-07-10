import './Content.scss';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { MdAdd } from "react-icons/md";
import Board from '../Board/Board';
import ModalWindow from '../ModalWindow/ModalWindow';

function Boards({
    boards,
    openBoardTasksPage,
    openModalWindow,
    isModalWindowOpened,
    closeModalWindow,
    onConfirm,
    actionType,
    initialTitle,
}) {
    const { t } = useTranslation();

    return (
        <>
            <main className="boards-page">
                <div className="boards-page-content">
                    <div className='start-button'>
                        <button
                            className='button rectangular-button colored'
                            onClick={() => openModalWindow({}, "createBoard")}
                        >
                            <MdAdd size="2em"/>
                            {t("add-board-button")}
                        </button>
                    </div>
                    <div className="boards-wrapper">
                        {Object.values(boards.boards).map(board => {
                            return (
                                <Board
                                    key={board.id}
                                    board={board}
                                    openBoardTasksPage={openBoardTasksPage}
                                    onEdit={() => openModalWindow(board, "renameBoard", board.title)}
                                    onDelete={() => openModalWindow(board, "deleteBoard")}
                                />
                            )
                        })}
                    </div>
                </div>
            </main>
            {isModalWindowOpened && (
                <ModalWindow
                    isOpen={isModalWindowOpened}
                    actionType={actionType}
                    onClose={closeModalWindow}
                    onConfirm={onConfirm}
                    initialTitle={initialTitle}
                />
            )}
        </>
    );
}
  
Boards.propTypes = {
    boards: PropTypes.shape({
        boards: PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            columnIds: PropTypes.arrayOf(PropTypes.string),
        }),
        columns: PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            noteIds: PropTypes.arrayOf(PropTypes.string),
        }),
        notes: PropTypes.shape({
            id: PropTypes.string,
            content: PropTypes.string,
        }),
    }).isRequired,
    openBoardTasksPage: PropTypes.func.isRequired,
    openModalWindow: PropTypes.func.isRequired,
    isModalWindowOpened: PropTypes.bool.isRequired,
    closeModalWindow: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    actionType: PropTypes.string.isRequired,
    initialTitle: PropTypes.string.isRequired,
};
  
export default Boards;
