import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

export const signup = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const doc = new UserModel({
            email: req.body.email,
            name: req.body.name,
            passwordHash: hash,
        });
        const user = await doc.save();
        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );
        const {passwordHash, ...userData} = user._doc;
        res.json({ ...userData, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to register' });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) return res.status(400).json({ message: 'Invalid login or password' });
        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );
        const {passwordHash, ...userData} = user._doc;
        res.json({ ...userData, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to login' });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const {passwordHash, ...userData} = user._doc;
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'No access' });
    }
};

export const deleteUser = async(req, res) => {
    const { userId } = req.params;
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        };
        await UserModel.findByIdAndDelete(userId);
        res.status(200).json({
            message: `User with ID ${userId} and associated data deleted successfully`,
            deletedUserId: userId,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error while deleting a user" });
    }
};