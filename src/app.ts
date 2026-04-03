import dotenv from 'dotenv';
dotenv.config();
import express, {Application, Request, Response} from 'express';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { loggerMiddleware } from './middleware/loggers';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/authMiddleware';

const app: Application  = express();
const PORT = 3000;

// middleware to parse JSON
app.use(express.json());
app.use(loggerMiddleware);

app.use("/auth", authRoutes);
app.use('/tasks', authMiddleware, taskRoutes);
app.get('/',(req: Request, res: Response) =>{
      res.send("Task Management API is running!");
}); 

app.use(errorHandler);
app.listen(PORT, () =>{
      console.log(`Server is sprinting at http://localhost:${PORT}`);
});