import './Content.scss';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { MdAdd } from "react-icons/md";
import Board from '../Board/Board';
import ModalWindow from '../ModalWindow/ModalWindow';

function Boards({
    boards,
    openedBoard,
    openBoardTasksPage,
    onDelete,
    onSave,
    openModalWindow,
    isModalWindowOpened,
    closeModalWindow,
    deleteProfile,
    currentItem,
}) {

    const { t } = useTranslation();
    return (
        <>
            <main className="boards-page">
                <div className="boards-page-content">
                    <div className='start-button'>
                        <button
                            className='button rectangular-button colored'
                            onClick={() => openModalWindow({}, 'edit')}
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
                                    onEdit={openModalWindow}
                                    onDelete={openModalWindow}
                                />
                            )
                        })}
                    </div>
                </div>
            </main>
            {isModalWindowOpened && (
                <ModalWindow
                    openedBoard={openedBoard}
                    onCancel={closeModalWindow}
                    onDelete={onDelete}
                    deleteProfile={deleteProfile}
                    onSave={onSave}
                    currentItem={currentItem}
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
    openedBoard: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        columnIds: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    openBoardTasksPage: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    openModalWindow: PropTypes.func.isRequired,
    isModalWindowOpened: PropTypes.bool.isRequired,
    closeModalWindow: PropTypes.func.isRequired,
    deleteProfile: PropTypes.func.isRequired,
    currentItem: PropTypes.string.isRequired,
};
  
export default Boards;
