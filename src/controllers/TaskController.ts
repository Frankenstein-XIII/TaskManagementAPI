import {NextFunction, Request, Response} from 'express';
import { taskService } from '../services/TaskService';
import { AppError } from '../utils/AppError';

export class TaskController{
      //GET task 
      public static getAllTasks(req: Request, res: Response): void{
            const tasks = taskService.getAllTasks();
            const summaries = taskService.getInventorySummary();

            //we send back both the full objects and summaries 
            res.status(200).json({
                  count: tasks.length,
                  tasks: tasks,
                  summaries: summaries
            });
      }

      //POST/ task/bug
      public static createBug(req: Request, res: Response): void{
            const{ title, severity} = req.body;
            if (!title || !severity){
                  res.status(400).json({message: "Messing title or severity"});
            }

            const newBug = taskService.createBug(title, severity);
            res.status(201).json(newBug);
      }

      // POST /task/feature
      public static createFeature(req: Request, res: Response, next: NextFunction): void{
            try{
                  const {title, impactScore} = req.body;
                  const numericImpact = Number(impactScore);
                  if(!title|| impactScore ===null || Number.isNaN(numericImpact)){
                        throw new AppError(400, "Vlalid title and numric impactScore are required.")
                  }
                  // business logic 
                  const newFeature = taskService.createFeature(title, Number(impactScore));
                  // success reponse 
                  res.status(201).json(newFeature)
            }
            catch (error){
                  next(error);
            }
      }
}
