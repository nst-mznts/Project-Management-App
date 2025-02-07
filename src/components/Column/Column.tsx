import './Column.scss';
import { FC } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { MdAdd } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { ActionType } from '../../utils/types/ActionType.types';
import { ColumnProps } from '../../utils/types/BasicTypes.types';
import Task from '../Task/Task';
import EditAndDeleteButtons from '../EditAndDeleteButtons/EditAndDeleteButtons';

const ColumnComponent: FC<ColumnProps> = ({ column, openModalWindow, index, tasks }) => {
  const { t } = useTranslation();
  const columnId = column._id;

  return (
    <Draggable draggableId={columnId} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className="column bordered"
        >
          <div className="column-title">
            {column.title}
            <EditAndDeleteButtons
              onEdit={() => openModalWindow(ActionType.RenameColumn, columnId, column.title)}
              onDelete={() => openModalWindow(ActionType.DeleteColumn, columnId)}
              buttonStyle="bordered"
            />
          </div>
          <div className="board-tasks-buttons">
            <button
              type="button"
              className="button rectangular-button additional-colored width100"
              onClick={() => openModalWindow(ActionType.AddTask, columnId)}
            >
              <MdAdd size="2em" />
              {t('add-task-button')}
            </button>
          </div>
          <Droppable droppableId={columnId} type="task">
            {(provided) => {
              return (
                <div {...provided.droppableProps} ref={provided.innerRef} className="task-wrapper">
                  {tasks.map((task, index) => {
                    return (
                      <Task
                        key={task._id}
                        task={task}
                        index={index}
                        openModalWindow={openModalWindow}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default ColumnComponent;
