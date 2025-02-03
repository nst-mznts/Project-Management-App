import BoardModel from '../models/Board.js';

export const createBoard = async (req, res) => {
    try {
        const doc = new BoardModel({
            title: req.body.title,
            user: req.userId,
        });
        const board = await doc.save();
        res.json(board);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to create board' });
    }
};

export const getAllBoards = async (req, res) => {
    try {
        const boards = await BoardModel.find({ user: req.userId }).populate('user').exec();
        res.json(boards);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to get boards' });
    }
};

export const getOneBoard = async (req, res) => {
    try {
        const boardId = req.params.id;
        const board = await BoardModel.findById(boardId).exec();
        if (!board) return res.status(404).json({ message: 'Board not found' });
        res.json(board);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred while receiving the board' });
    }
};

export const removeBoard = async (req, res) => {
    try {
        const boardId = req.params.id;
        const deletedBoard = await BoardModel.findOneAndDelete({ _id: boardId });
        if (!deletedBoard) return res.status(404).json({ message: 'Board not found' });
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Board not found' });
    }
};

export const updateBoard = async (req, res) => {
    try {
        const boardId = req.params.id;
        await BoardModel.updateOne(
            {
                _id: boardId,
            },
            {
                title: req.body.title,
                user: req.userId,
            },
        );
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to update board' });
    }
}
