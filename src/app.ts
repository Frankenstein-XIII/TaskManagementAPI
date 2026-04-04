import dotenv from 'dotenv';
dotenv.config();
import express, {Application, Request, Response} from 'express';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { loggerMiddleware } from './middleware/loggers';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/authMiddleware';
// import mongoose from 'mongoose';
import cors from 'cors';


const app: Application  = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/taskmanager';
// middleware to parse JSON
app.use(express.json());
app.use(cors());
app.use(loggerMiddleware);

app.use("/auth", authRoutes);
app.use('/tasks', authMiddleware, taskRoutes);
app.get('/',(req: Request, res: Response) =>{
      res.send("Task Management API is running!");
}); 

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is sprinting at http://localhost:${PORT}`);
});

// mongoose.connection.on('error', err =>{
//       console.log("Mongoose runtime error:", err);
// });

// mongoose.connect(MONGO_URL).then(() =>{
//       console.log("Sucessfully connected to MongoDB!");

//       app.listen(PORT, () => {
//         console.log(`Server is sprinting at http://localhost:${PORT}`);
//       });
// }).catch((error) =>{
//       console.error("Error connecting to MongoDB.", error.message);
//       process.exit(1);
// })

