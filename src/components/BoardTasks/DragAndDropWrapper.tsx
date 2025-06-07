import { FC } from 'react';
import { DragDropContext, Droppable, DropResult, DroppableProvided } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateTaskOrder } from '../../redux/slices/tasks';
import { updateColumnOrder } from '../../redux/slices/columns';
import { Column, Task } from '../../utils/types/BasicTypes.types';
import { setTempColumns, setTempTasks, resetTempState } from '../../redux/slices/tempBoardSlice';

interface DragAndDropWrapperProps {
  columns: Column[];
  tasks: Task[];
  boardId: string;
  children: (provided: DroppableProvided) => JSX.Element;
}

const DragAndDropWrapper: FC<DragAndDropWrapperProps> = ({ columns, tasks, boardId, children }) => {
  const dispatch = useAppDispatch();
  const tempColumns = useAppSelector((state) => state.tempBoard.columns);
  const tempTasks = useAppSelector((state) => state.tempBoard.tasks);

  const reorderTasks = (tasksList: Task[]) =>
    tasksList.map((task, index) => ({ ...task, order: index }));

  const onDragEnd = (result: DropResult): void => {
    const { source, destination, type, draggableId } = result;
    if (!destination) return;

    if (type === 'column') {
      handleColumnDrag(source, destination);
    } else if (type === 'task') {
      handleTaskDrag(source, destination);
    }
  };

  const handleColumnDrag = (source: { index: number }, destination: { index: number }): void => {
    const columnList: Column[] = [...(tempColumns.length ? tempColumns : columns)];
    const [movedColumn] = columnList.splice(source.index, 1);
    columnList.splice(destination.index, 0, movedColumn);
    const updatedColumns = columnList.map((col, i) => ({ ...col, order: i }));
    dispatch(setTempColumns(updatedColumns));

    dispatch(updateColumnOrder({ boardId, columns: updatedColumns }))
      .unwrap()
      .catch((err) => {
        console.error('Failed to update column order:', err);
        dispatch(setTempColumns(columns));
      });
  };

  const handleTaskDrag = (
    source: { index: number; droppableId: string },
    destination: { index: number; droppableId: string }
  ): void => {
    const sourceColumnId: string = source.droppableId;
    const destinationColumnId: string = destination.droppableId;
    const sourceTasks = (tempTasks.length ? tempTasks : tasks).filter(
      (task) => task.column._id === sourceColumnId
    );
    const [movedTask] = sourceTasks.splice(source.index, 1);

    let updatedTasks = [...(tempTasks.length ? tempTasks : tasks)];

    if (sourceColumnId === destinationColumnId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const reorderedTasks = reorderTasks(sourceTasks);
      updatedTasks = updatedTasks.map((task) => {
        const foundTask = reorderedTasks.find((reordered) => reordered._id === task._id);
        return foundTask ? { ...task, order: foundTask.order } : task;
      });
    } else {
      const destinationTasks = (tempTasks.length ? tempTasks : tasks).filter(
        (task) => task.column._id === destinationColumnId
      );
      destinationTasks.splice(destination.index, 0, movedTask);
      const reorderedTasks = reorderTasks(destinationTasks);
      updatedTasks = updatedTasks.map((task) => {
        const foundTask = reorderedTasks.find((reordered) => reordered._id === task._id);
        return foundTask
          ? {
              ...task,
              column: { ...task.column, _id: destinationColumnId },
              order: foundTask.order,
            }
          : task;
      });
    }

    dispatch(setTempTasks(updatedTasks));

    dispatch(updateTaskOrder({ boardId, tasks: [...updatedTasks] }))
      .unwrap()
      .catch((err) => {
        console.error('Failed to update task order:', err);
        dispatch(setTempTasks(tasks));
      });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided: DroppableProvided) => children(provided)}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDropWrapper;
