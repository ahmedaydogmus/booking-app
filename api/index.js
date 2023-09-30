import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';

const app = express();


dotenv.config();
app.use(express.json());


const PORT = process.env.PORT || 5500
const MONGODB_URL = process.env.MONGODB_URL


// MIDDLEWARES
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use((err,req,res,next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'Something went wrong!'
    return res.status(errorStatus).json(errorMessage);
})


// MONGODB CONNECTION

mongoose.connect(MONGODB_URL)
.then(
    () => {
        console.log('Connected to MongoDB successfully!');
        app.listen(PORT, () => {
            console.log(`Connected to port ${PORT}`);
        })
    }
)
.catch(err => console.log(err.message))







