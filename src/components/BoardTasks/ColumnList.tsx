import { FC, memo } from 'react';
import { ColumnListProps, Column, Task } from '../../utils/types/BasicTypes.types';
import ColumnComponent from '../Column/Column';
import DragAndDropWrapper from './DragAndDropWrapper';
import { useAppSelector } from '../../redux/hooks';

const ColumnList: FC<ColumnListProps> = ({ columns, onOpen, boardId, tasks }) => {
  const tempColumns = useAppSelector((state) => state.tempBoard.columns);
  const tempTasks = useAppSelector((state) => state.tempBoard.tasks);

  return (
    <DragAndDropWrapper columns={columns} tasks={tasks} boardId={boardId}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="column-wrapper">
          {(tempColumns.length ? tempColumns : columns).map((column: Column, index: number) => {
            const tasksForColumn: Task[] = (tempTasks.length ? tempTasks : tasks)
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

export default memo(ColumnList, (prevProps, nextProps) => {
  return (
    prevProps.columns === nextProps.columns &&
    prevProps.tasks === nextProps.tasks &&
    prevProps.boardId === nextProps.boardId &&
    prevProps.onOpen === nextProps.onOpen
  );
});
