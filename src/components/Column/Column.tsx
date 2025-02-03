import './Column.scss';
import { FC } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { MdAdd } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { ActionType } from '../../utils/types';
import Task from '../Task/Task';
import EditAndDeleteButtons from '../EditAndDeleteButtons/EditAndDeleteButtons';

type Column = {
    _id: string;
    title: string;
}

interface ColumnProps {
    column: Column;
    openModalWindow:(actionType: ActionType, id?: string, initialTitle?: string) => void;
    index: number;
}

const Column:FC<ColumnProps> = ({ column, openModalWindow, index, tasks }) => {
    const { t } = useTranslation();
    const columnId = column._id;

    const handleEditColumn = () => {
        openModalWindow(ActionType.RenameColumn, columnId, column.title);
    };

    const handleDeleteColumn = () => {
        openModalWindow(ActionType.DeleteColumn, columnId);
    };

    return (
        <Draggable draggableId={columnId} index={index}>
            {provided => (
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    className='column bordered'
                >
                    <div className='column-title'>
                        {column.title}
                        <EditAndDeleteButtons
                            onEdit={handleEditColumn}
                            onDelete={handleDeleteColumn}
                            buttonStyle='bordered'
                        />
                    </div>
                    <div className='board-tasks-buttons'>
                        <button
                            type="button"
                            className="button rectangular-button additional-colored width100"
                            onClick={() => openModalWindow(ActionType.AddTask, columnId)}
                        >
                            <MdAdd size="2em"/>
                            {t("add-task-button")}
                        </button>
                    </div>
                    <Droppable droppableId={columnId} type="task">
                        {(provided) => {
                            return (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className='task-wrapper'
                                >
                                    {tasks.map((task, index) => {
                                        return(
                                            <Task
                                                key={task._id}
                                                task={task}
                                                index={index}
                                                openModalWindow={openModalWindow}
                                            />
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
}

export default Column;
