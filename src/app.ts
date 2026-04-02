import express, {Application, Request, Response} from 'express';

const app: Application  = express();
const PORT = 300;

// middleware to parse JSON
app.use(express.json());

app.get('/',(req: Request, res: Response) =>{
      res.send("Task Management API is running!");
});

app.listen(PORT, () =>{
      console.log(`Server is sprinting at http://localhost:${PORT}`);
});