import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import listingRouter from './routes/listing.route.js'
import path from 'path';


dotenv.config();

try {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`connected to mongodb`);
    })
    .catch((err) => { 
        console.log(err);
    })
} catch (error) {
    console.log(err);
}


const __dirname = path.resolve();


const app = express();

//this will allow to send json data to the server
app.use(express.json()); 
 
app.use(cookieParser())

const port = process.env.PORT

app.listen(port, () => {
    console.log(`server is running ${port}`);
})


app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/listing',listingRouter)




app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})




app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "INTERNAl SERVER ERROR"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})
 
