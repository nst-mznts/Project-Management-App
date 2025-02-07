import { FC } from 'react';
import { ColumnListProps, Column, Task } from '../../utils/types/BasicTypes.types';
import ColumnComponent from '../Column/Column';
import DragAndDropWrapper from './DragAndDropWrapper';

const ColumnList: FC<ColumnListProps> = ({ columns, onOpen, boardId, tasks }) => {
  return (
    <DragAndDropWrapper columns={columns} tasks={tasks} boardId={boardId}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="column-wrapper">
          {columns.map((column: Column, index: number) => {
            const tasksForColumn: Task[] = tasks
              .filter((task: Task) => task.column._id === column._id)
              .sort((a, b) => a.order - b.order);
            return (
              <ColumnComponent
                key={column._id}
                column={column}
                openModalWindow={onOpen}
                index={index}
                tasks={tasksForColumn}
              />
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </DragAndDropWrapper>
  );
};

export default ColumnList;
