import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { registerValidation, loginValidation, boardCreateValidation } from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as BoardController from './controllers/BoardController.js';
import * as ColumnController from './controllers/ColumnController.js';
import * as TaskController from './controllers/TaskController.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose.connect(
    'mongodb+srv://middlenast:49mMH19JxT1Do38U@nst-mznts.z5wao56.mongodb.net/pmapp?retryWrites=true&w=majority&appName=nst-mznts'
)
.then(() => console.log('DB OK'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(cors());
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/signup', registerValidation, handleValidationErrors, UserController.signup);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/boards', checkAuth, BoardController.getAll);
app.get('/boards/:id', BoardController.getOne);
app.post('/boards', checkAuth, boardCreateValidation, handleValidationErrors, BoardController.create);
app.delete('/boards/:id', checkAuth, BoardController.remove);
app.patch('/boards/:id', checkAuth, boardCreateValidation, handleValidationErrors, BoardController.update);

app.post('/boards/:id/columns', checkAuth, ColumnController.createColumn); // handleValidationErrors
app.get('/boards/:id/columns', checkAuth, ColumnController.getAllColumns);
app.patch('/boards/:boardId/columns/order', checkAuth, ColumnController.updateColumnOrder);
app.delete('/boards/:boardId/columns/:columnId', checkAuth, ColumnController.removeColumn);
app.patch('/boards/:boardId/columns/:columnId', checkAuth, ColumnController.updateColumn);

app.post('/boards/:boardId/columns/:columnId', TaskController.createTask); // checkAuth, boardCreateValidation, handleValidationErrors
app.get('/boards/:boardId/tasks', checkAuth, TaskController.getAllTasks);
app.patch('/boards/:boardId/tasks/order', checkAuth, TaskController.updateTaskOrder);
app.delete('/boards/:boardId/tasks/:taskId', checkAuth, TaskController.removeTask);
app.patch('/boards/:boardId/tasks/:taskId', checkAuth, TaskController.updateTask);

app.listen(3004, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('server ok');
});
