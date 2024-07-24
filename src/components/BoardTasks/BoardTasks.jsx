import './BoardTasks.scss';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ModalWindow from '../ModalWindow/ModalWindow';
import Column from '../Column/Column';
import { useTranslation } from 'react-i18next';

function BoardTasks({
    boards,
    openBoardsPage,
    openedBoard,
    openModalWindow,
    isModalWindowOpened,
    closeModalWindow,
    onConfirm,
    actionType,
    initialTitle,
    updateOrderNoteIds,
}) {
    const { t } = useTranslation();

    return (
        <>
            <main className="boards-page">
                <div className="boards-page-content">
                    <div className='board-tasks-button-wrapper'>
                        <div className='board-tasks-buttons'>
                            <button
                                type="button"
                                className="button rectangular-button bordered"
                                onClick={openBoardsPage}
                            >
                                {t("back-button")}
                            </button>
                        </div>
                        <h3 className='board-tasks-title'>{openedBoard.title}</h3>
                        <div className='board-tasks-buttons'>
                            <button
                                type="button"
                                className="button rectangular-button colored"
                                onClick={() => openModalWindow(openedBoard, "addColumn")}
                            >
                                {t("add-column-button")}
                            </button>
                        </div>
                    </div>
                    <DragDropContext onDragEnd={(result) => updateOrderNoteIds(result)}>
                        <Droppable droppableId="all-columns" direction="horizontal" type="column">
                            {provided => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className='column-wrapper'
                                >
                                    {openedBoard.columnIds.map((columnId, index) => {
                                        return(
                                            <Column
                                                key={columnId}
                                                boards={boards}
                                                columnId={columnId}
                                                openedBoard={openedBoard}
                                                openModalWindow={openModalWindow}
                                                index={index}
                                            />
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
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

BoardTasks.propTypes = {
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
    openBoardsPage: PropTypes.func.isRequired,
    openedBoard: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        columnIds: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    openModalWindow: PropTypes.func.isRequired,
    isModalWindowOpened: PropTypes.bool.isRequired,
    closeModalWindow: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    actionType: PropTypes.string.isRequired,
    initialTitle: PropTypes.string.isRequired,
    updateOrderNoteIds: PropTypes.func.isRequired,
};

export default BoardTasks;
