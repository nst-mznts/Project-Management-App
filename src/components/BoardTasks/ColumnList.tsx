import { FC } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../../redux/hooks';
import { updateTaskOrder } from '../../redux/slices/tasks';
import { updateColumnOrder } from '../../redux/slices/columns';
import { ActionType } from '../../utils/types';
import Column from '../Column/Column';

interface ColumnListProps {
    columns: Column[];
    onOpen:(actionType: ActionType, id?: string, initialTitle?: string) => void;
    boardId: string;
}

const ColumnList:FC<ColumnListProps> = ({ columns, onOpen, boardId, tasks }) => {
    // console.log('🔥 tasks в сторе после обновления:', tasks);
    const dispatch = useAppDispatch();
    
    const handleColumnDrag = (source, destination) => {
        if (!destination) return;
        const reorderedColumns = Array.from(columns);
        const [movedColumn] = reorderedColumns.splice(source.index, 1);
        reorderedColumns.splice(destination.index, 0, movedColumn);
        const updatedColumns = reorderedColumns.map((column, index) => ({
            ...column,
            order: index,
        }));
    
        console.log('updatedColumns', updatedColumns);
        dispatch(updateColumnOrder({ boardId, columns: updatedColumns }));
    };

    const handleTaskDrag = (source, destination, draggableId) => {
        const sourceColumn = source.droppableId;
        const destinationColumn = destination.droppableId;
        const tasksForReorder = tasks.items.filter((task) => task.column._id === sourceColumn);
        const movedTask = tasksForReorder.find(task => task._id === draggableId);

        if (sourceColumn === destinationColumn) {
            tasksForReorder.splice(destination.index, 0, movedTask);
            const reorderedTasks = tasksForReorder.map((task, index) => ({...task, order: index}));
            const updatedTasks = tasks.items.map((task) => {
                const foundTask = reorderedTasks.find(reordered => reordered._id === task._id);
                return foundTask ? { ...task, order: foundTask.order } : task;
            });
            dispatch(updateTaskOrder({ boardId, tasks: [...updatedTasks] }));
        } else {
            const destinationTaskIds = tasks.items.filter((task) => task.column._id === destinationColumn);
            destinationTaskIds.splice(destination.index, 0, movedTask);
            const reorderedTasks = destinationTaskIds.map((task, index) => ({...task, order: index}));
            const updatedTasks = tasks.items.map((task) => {
                const foundTask = reorderedTasks.find(reordered => reordered._id === task._id);
                return foundTask ? { ...task, column: {...task.column, _id: destinationColumn }, order: foundTask.order } : task;
            });
            dispatch(updateTaskOrder({ boardId, tasks: [...updatedTasks] }));
        }
    }

    const onDragEnd = (result) => {
        console.log('result', result);
        const { source, destination, type, draggableId } = result;
        if (!destination) return;
        if (type === 'column') {
            handleColumnDrag(source, destination);
        } else if (type === 'task') {
            handleTaskDrag(source, destination, draggableId);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {provided => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className='column-wrapper'
                    >
                        {columns.map((column: Column, index: number) => {
                            const tasksForColumn = tasks.items.filter((task) => task.column._id === column._id).slice().sort((a, b) => a.order - b.order);
                            // console.log('tasksForColumn', tasksForColumn);
                            return(
                                <Column
                                    key={column._id}
                                    column={column}
                                    openModalWindow={onOpen}
                                    index={index}
                                    tasks={tasksForColumn}
                                />
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default ColumnList;
