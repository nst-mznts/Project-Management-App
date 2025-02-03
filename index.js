import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/', routes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, (err) => {
    if (err) {
        return console.error('Server error:', err);
    }
    console.log(`Server is running on port ${PORT}`);
});
