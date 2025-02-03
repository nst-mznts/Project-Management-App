import './Task.scss';
import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ActionType } from '../../utils/types';
import EditAndDeleteButtons from '../EditAndDeleteButtons/EditAndDeleteButtons';

type Task = {
    _id: string;
    title: string;
}

interface TaskProps {
    task: Task;
    index: number;
    openModalWindow:(actionType: ActionType, id?: string, initialTitle?: string) => void;
}

const Task:FC<TaskProps> = ({ task, index, openModalWindow }) => {
    const taskId = task._id;

    const handleEditTask = () => {
        openModalWindow(ActionType.RenameTask, taskId, task.title);
    };

    const handleDeleteTask = () => {
        openModalWindow(ActionType.DeleteTask, taskId);
    };

    return (
        <Draggable draggableId={taskId} index={index}>
            {(provided) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='task bordered'
                    >
                        <div className='task-content'>{task.title}</div>
                        <div className='task-footer'>
                            <EditAndDeleteButtons
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                                buttonStyle='bordered'
                            />
                        </div>
                    </div>
                )
            }}
        </Draggable>
    );
}

export default Task;
