import './BoardTasks.scss';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import axios from '../../axios';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ModalWindow from '../ModalWindow/ModalWindow';
import Column from '../Column/Column';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColumns, fetchRemoveColumn } from '../../redux/slices/columns';
import { fetchNotes } from '../../redux/slices/notes';

function BoardTasks({
    openModalWindow,
    isModalWindowOpened,
    closeModalWindow,
    actionType,
    boardIdForRemoving,
    initialTitle,
}) {
    const [data, setData] = useState();
    const columns = useSelector(state => state.columns.columns.items);
    const notes = useSelector(state => state.notes.notes.items);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            return;
        }

        axios.get(`/boards/${id}`).then(res => {
            setData(res.data);
            setIsLoading(false);
        }).catch(err => {
            console.warn(err);
            alert('Ошибка при получении статьи');
        });

        dispatch(fetchColumns(id));
    }, [id, dispatch]);

    const handleConfirm = (title, action, columnId='') => {
        switch (action) {
            case 'addColumn':
                onSubmit(title);
                break;
            case 'deleteColumn':
                onRemove(boardIdForRemoving);
                break;
            case 'renameColumn':
                onEdit(boardIdForRemoving, title);
                break;
            case 'addTask':
                console.log('addTask title ', title);
                console.log('addTask columnId ', boardIdForRemoving);
                addNote(title, boardIdForRemoving);
                break;
            default:
                break;
        };
        closeModalWindow();
    };

    const onSubmit = async (title) => {
        try {
            const { data } = await axios.post(`/boards/${id}`, {title: title});
            dispatch(fetchColumns(id));
        } catch (err) {
            console.warn(err);
        }
    };

    const addNote = async (title, columnId) => {
        console.log('addNote title ', title);
        console.log('addNote columnId ', columnId);
        try {
            const { data } = await axios.post(`/boards/${id}/columns/${columnId}`, {title: title});
            console.log(data);
            dispatch(fetchNotes({boardId: id, columnId}));
        } catch (err) {
            console.warn(err);
        }
    };

    const onRemove = (columnId) => {
        dispatch(fetchRemoveColumn({boardId: id, columnId}));
    };

    const onEdit = async (columnId, title) => {
        const { data } = await axios.patch(`/boards/${id}/columns/${columnId}`, {title: title});
        dispatch(fetchColumns(id));
    };

    return (
        <>
            <main className="boards-page">
                <div className="boards-page-content">
                    <div className='board-tasks-button-wrapper'>
                        <div className='board-tasks-buttons'>
                            <Link
                                className="button rectangular-button bordered"
                                to='/boards'
                            >
                                {t("back-button")}
                            </Link>
                        </div>
                        {isLoading ? <div className='board-tasks-title-skeleton'></div> : 
                        <h3 className='board-tasks-title'>{data.title}</h3>
                        }
                        <div className='board-tasks-buttons'>
                            <button
                                type="button"
                                className="button rectangular-button colored"
                                onClick={() => openModalWindow("addColumn")}
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
                                    {columns.map((column, index) => {
                                        return(
                                            <Column
                                                key={column._id}
                                                column={column}
                                                id={column._id}
                                                openModalWindow={openModalWindow}
                                                index={index}
                                                onDelete={onRemove}
                                                boardId={id}
                                                notes={notes}
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
                    actionType={actionType}
                    onClose={closeModalWindow}
                    onConfirm={handleConfirm}
                    initialTitle={initialTitle}
                />
            )}
        </>
    );
}

// BoardTasks.propTypes = {
//     boards: PropTypes.shape({
//         boards: PropTypes.shape({
//             id: PropTypes.string,
//             title: PropTypes.string,
//             columnIds: PropTypes.arrayOf(PropTypes.string),
//         }),
//         columns: PropTypes.shape({
//             id: PropTypes.string,
//             title: PropTypes.string,
//             noteIds: PropTypes.arrayOf(PropTypes.string),
//         }),
//         notes: PropTypes.shape({
//             id: PropTypes.string,
//             content: PropTypes.string,
//         }),
//     }).isRequired,
//     openBoardsPage: PropTypes.func.isRequired,
//     openedBoard: PropTypes.shape({
//         id: PropTypes.string,
//         title: PropTypes.string,
//         columnIds: PropTypes.arrayOf(PropTypes.string),
//     }).isRequired,
//     openModalWindow: PropTypes.func.isRequired,
//     isModalWindowOpened: PropTypes.bool.isRequired,
//     closeModalWindow: PropTypes.func.isRequired,
//     onConfirm: PropTypes.func.isRequired,
//     actionType: PropTypes.string.isRequired,
//     initialTitle: PropTypes.string.isRequired,
//     updateOrderNoteIds: PropTypes.func.isRequired,
// };

export default BoardTasks;
