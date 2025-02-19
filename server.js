import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors'

const port = process.env.PORT || 8000;

connectDB(); // connect to mongoDB

const app = express();
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser())


app.get('/', (req, res) => {
    res.send('API is running....');
});

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
    console.log(`Server running on port ${port}`)
);