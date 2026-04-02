import {Request, Response} from 'express';
import { taskService } from '../services/TaskService';

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
      public static createFeature(req: Request, res: Response): void{
            const {title, impactScore} = req.body;

            if(!title|| !impactScore ===undefined){
                  res.status(400).json({message: "Missing title or impactScore"});
            }

            const newFeature = taskService.createFeature(title, Number(impactScore));
            res.status(201).json(newFeature)
      }
}
