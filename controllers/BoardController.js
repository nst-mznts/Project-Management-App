import BoardModel from '../models/Board.js';

export const getAll = async (req, res) => {
    try {
        const boards = await BoardModel.find({ user: req.userId }).populate('user').exec();
        res.json(boards);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить доски',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const boardId = req.params.id;
        const board = await BoardModel.findById(boardId).exec();
        if (!board) {
            return res.status(404).json({
                message: 'Доска не найдена',
            });
        }
        res.json(board);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Произошла ошибка при получении доски',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const boardId = req.params.id;
        const deletedBoard = await BoardModel.findOneAndDelete({ _id: boardId });
        if (!deletedBoard) {
            return res.status(404).json({
                success: false,
                message: 'Доска не найдена',
            });
        }
        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Доска не найдена',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new BoardModel({
            title: req.body.title,
            user: req.userId,
        });
        const board = await doc.save();
        res.json(board);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать доску',
        });
    }
}

export const update = async (req, res) => {
    try {
        const boardId = req.params.id;
        await BoardModel.updateOne(
            {
                _id: boardId,
            },
            {
                title: req.body.title,
                // user: req.userId,
            },
        );
        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить доску',
        });
    }
}
