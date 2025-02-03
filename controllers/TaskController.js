import TaskModel from "../models/Task.js";

export const getAllTasks = async (req, res) => {
    const { boardId } = req.params;
    try {
        const tasks = await TaskModel.find({ board: boardId }).populate('column').sort({ order: 1 });
        res.json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to get tasks' });
    }
};

export const createTask = async (req, res) => {
    const { boardId, columnId } = req.params;
    try {
        const maxOrderTasks = await TaskModel.findOne({ column: columnId }).sort('-order');
        const newOrder = maxOrderTasks ? maxOrderTasks.order + 1 : 0;
        const newTask = new TaskModel({
            title: req.body.title,
            board: boardId,
            column: columnId,
            order: newOrder,
        });
        const savedTAsk = await newTask.save();
        res.json(savedTAsk);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to create task' });
    };
};

export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        await TaskModel.updateOne(
            {
                _id: taskId,
            },
            {
                title: req.body.title,
            },
        );
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to update task' });
    }
};

export const removeTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const deletedTask = await TaskModel.findOneAndDelete({ _id: taskId });
        if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Task not found' });
    }
};

export const updateTaskOrder = async (req, res) => {
    const tasks = req.body;
    if (!Array.isArray(tasks)) return res.status(400).json({ message: 'Invalid data format, expected an array' });
    try {
        const updateResults = await Promise.all(
            tasks.map(async (task) => {
                const updatedTask = await TaskModel.findByIdAndUpdate(
                    task._id,
                    { column: task.column },
                    { order: task.order },
                    { new: true }
                );
                if (!updatedTask) console.warn(`Task not found: ${task._id}`);
                return updatedTask;
            })
        );
        res.json({ message: 'Task order updated successfully', updatedTasks: updateResults });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to update task order' });
    }
};
