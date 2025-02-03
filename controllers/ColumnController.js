import ColumnModel from "../models/Column.js";

export const createColumn = async (req, res) => {
    try {
        const maxOrderColumn = await ColumnModel.findOne({ board: req.params.id }).sort('-order');
        const newOrder = maxOrderColumn ? maxOrderColumn.order + 1 : 0;
        const newColumn = new ColumnModel({
            title: req.body.title,
            board: req.params.id,
            order: newOrder,
        });
        const savedColumn = await newColumn.save();
        res.json(savedColumn);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create column' });
    }
};

export const getAllColumns = async (req, res) => {
    try {
        const columns = await ColumnModel.find({ board: req.params.id }).populate('board').sort({ order: 1 });
        res.json(columns);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to get columns' });
    }
};

export const removeColumn = async (req, res) => {
    try {
        const { columnId } = req.params;
        const deletedColumn = await ColumnModel.findOneAndDelete({ _id: columnId });
        if (!deletedColumn) return res.status(404).json({ message: 'Column not found' });
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Column not found' });
    }
};

export const updateColumn = async (req, res) => {
    try {
        const { columnId } = req.params;
        await ColumnModel.updateOne(
            {
                _id: columnId,
            },
            {
                title: req.body.title,
            },
        );
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to update column' });
    }
};

export const updateColumnOrder = async (req, res) => {
    const columns = req.body;
    if (!Array.isArray(columns)) return res.status(400).json({ message: 'Invalid data format, expected an array' });
    try {
        const updateResults = await Promise.all(
            columns.map(async (column) => {
                const updatedColumn = await ColumnModel.findByIdAndUpdate(
                    column._id,
                    { order: column.order },
                    { new: true }
                );
                if (!updatedColumn) console.warn(`Column not found: ${column.id}`);
                return updatedColumn;
            })
        );
        res.json({ message: 'Column order updated successfully', updatedColumns: updateResults });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to update column order' });
    }
};
