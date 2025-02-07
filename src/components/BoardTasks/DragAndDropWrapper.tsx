import { FC } from 'react';
import { DragDropContext, Droppable, DropResult, DroppableProvided } from 'react-beautiful-dnd';
import { useAppDispatch } from '../../redux/hooks';
import { updateTaskOrder } from '../../redux/slices/tasks';
import { updateColumnOrder } from '../../redux/slices/columns';
import { Column, Task } from '../../utils/types/BasicTypes.types';

interface DragAndDropWrapperProps {
  columns: Column[];
  tasks: Task[];
  boardId: string;
  children: (provided: DroppableProvided) => JSX.Element;
}

const DragAndDropWrapper: FC<DragAndDropWrapperProps> = ({ columns, tasks, boardId, children }) => {
  const dispatch = useAppDispatch();

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
    const columnList: Column[] = [...columns];
    const [movedColumn] = columnList.splice(source.index, 1);
    columnList.splice(destination.index, 0, movedColumn);
    const updatedColumns = columnList.map((col, i) => ({ ...col, order: i }));
    dispatch(updateColumnOrder({ boardId, columns: updatedColumns }));
  };

  const handleTaskDrag = (
    source: { index: number; droppableId: string },
    destination: { index: number; droppableId: string }
  ): void => {
    const sourceColumnId: string = source.droppableId;
    const destinationColumnId: string = destination.droppableId;
    const sourceTasks = tasks.filter((task) => task.column._id === sourceColumnId);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceColumnId === destinationColumnId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const reorderedTasks = reorderTasks(sourceTasks);
      const updatedTasks = tasks.map((task) => {
        const foundTask = reorderedTasks.find((reordered) => reordered._id === task._id);
        return foundTask ? { ...task, order: foundTask.order } : task;
      });
      dispatch(updateTaskOrder({ boardId, tasks: [...updatedTasks] }));
    } else {
      const destinationTasks = tasks.filter((task) => task.column._id === destinationColumnId);
      destinationTasks.splice(destination.index, 0, movedTask);
      const reorderedTasks = reorderTasks(destinationTasks);
      const updatedTasks = tasks.map((task) => {
        const foundTask = reorderedTasks.find((reordered) => reordered._id === task._id);
        return foundTask
          ? {
              ...task,
              column: { ...task.column, _id: destinationColumnId },
              order: foundTask.order,
            }
          : task;
      });
      dispatch(updateTaskOrder({ boardId, tasks: [...updatedTasks] }));
    }
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
