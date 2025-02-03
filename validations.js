import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password length must be at least 8 characters').isLength({ min: 8 }),
];

export const registerValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password length must be at least 8 characters').isLength({ min: 8 }),
    body('name', 'Please enter your name').isLength({ min: 1 }),
];
