import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Длина пароля минимум 8 символов').isLength({ min: 8 }),
];

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Длина пароля минимум 8 символов').isLength({ min: 8 }),
    body('name', 'Укажите имя').isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка').optional().isURL(),
];

export const boardCreateValidation = [
    body('title', 'Введите заголовок').isLength({ min: 1 }).isString(),
];