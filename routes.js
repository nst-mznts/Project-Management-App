import express from 'express';
import checkAuth from './utils/checkAuth.js';
import handleValidationErrors from './utils/handleValidationErrors.js';
// import { registerValidation, loginValidation, boardCreateValidation } from './validations.js';
import * as UserController from './controllers/UserController.js';
import * as BoardController from './controllers/BoardController.js';
import * as ColumnController from './controllers/ColumnController.js';
import * as TaskController from './controllers/TaskController.js';

const router = express.Router();

// Auth Routes
router.post('/auth/login', UserController.login);
router.post('/auth/signup', UserController.signup);
router.get('/auth/me', checkAuth, UserController.getMe);
router.delete('/:userId', UserController.deleteUser);

// Board Routes
router.route('/boards')
    .get(checkAuth, BoardController.getAllBoards)
    .post(checkAuth, handleValidationErrors, BoardController.createBoard);

router.route('/boards/:id')
    .get(BoardController.getOneBoard)
    .delete(checkAuth, BoardController.removeBoard)
    .patch(checkAuth, handleValidationErrors, BoardController.updateBoard);

// Column Routes
router.route('/boards/:id/columns')
    .post(checkAuth, ColumnController.createColumn)
    .get(checkAuth, ColumnController.getAllColumns);

router.patch('/boards/:boardId/columns/order', checkAuth, ColumnController.updateColumnOrder);
router.route('/boards/:boardId/columns/:columnId')
    .delete(checkAuth, ColumnController.removeColumn)
    .patch(checkAuth, ColumnController.updateColumn);

// Task Routes
router.post('/boards/:boardId/columns/:columnId', checkAuth, TaskController.createTask);
router.get('/boards/:boardId/tasks', checkAuth, TaskController.getAllTasks);

router.patch('/boards/:boardId/tasks/order', checkAuth, TaskController.updateTaskOrder);
router.route('/boards/:boardId/tasks/:taskId')
    .delete(checkAuth, TaskController.removeTask)
    .patch(checkAuth, TaskController.updateTask);

export default router;
