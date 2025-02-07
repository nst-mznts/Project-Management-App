import './Task.scss';
import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskProps } from '../../utils/types/BasicTypes.types';
import { ActionType } from '../../utils/types/ActionType.types';
import EditAndDeleteButtons from '../EditAndDeleteButtons/EditAndDeleteButtons';

const Task: FC<TaskProps> = ({ task, index, openModalWindow }) => {
  const taskId = task._id;

  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="task bordered"
          >
            <div className="task-content">{task.title}</div>
            <div className="task-footer">
              <EditAndDeleteButtons
                onEdit={() => openModalWindow(ActionType.RenameTask, taskId, task.title)}
                onDelete={() => openModalWindow(ActionType.DeleteTask, taskId)}
                buttonStyle="bordered"
              />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;
